import axios, {AxiosResponse} from "axios";
import {Model} from "./info-modal";
import {es} from "./es-MX";

function isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor.name === 'Object';
}

function createGqlQuery(obj: any): string {
    let shape = [];
    obj['id'] = '';
    for (let [key, val] of Object.entries(obj))
        shape.push(isObject(val) ? `${key} { ${createGqlQuery(val)} }` : key);

    return shape.join(' ');
}

function toType(value: any): string {
    return isNaN(Number(value)) ? `"${value}"` : value;
}

function makeGraphqlParameters(model: Model): string {
    let params = '';
    Object.keys(model).forEach((field) =>
    {
        const value = toType(model[field]);
        if (!!value) {
            params = params.concat(`${field}: ${value},`)
        }
    });
    return params;
}

function unflatten(data: any) {
    const result: any = {};
    for (const i in data) {
        const keys = i.split('.');
        keys.reduce(function (r: any, e: any, j: any) {
            return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[i] : {}) : [])
        }, result)
    }
    return result;
}

export function toGraphQL(request: { key: string }) {
    return createGqlQuery(unflatten({[`${request.key}`]: ''}));
}

export function toSingular(t: string) {
    return t.replace(/ies/, 'y').replace(/s/, '');
}

function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export interface GraphQLIndexResponse {
    resourceName?: string;
    data: any[];
    isASubResource?: boolean;
}

export class GraphQLBuilder {
    private isASubResource = this.resource.indexOf('(') !== -1;
    private isAResource = false;
    private subCollection = '';
    private resourceGraphQL = this.resource.split('(')[0];
    constructor(private resource: string, private fields: { sortable: boolean, key: string }[], private fatherID?: string) {
    }

    remove(resourceGraphQL: string, id: string) {
        return axios({
            url: '/graphql',
            method: 'post',
            data: {
                query: `
                    mutation {
                        ${camelize(`Update ${resourceGraphQL}`)}(id: ${id}) {
                            id
                        }
                      }
                  `
            }
        });
    }
    find(id: string) {
        const query = this.toSingular();
        return axios({
            url: '/graphql',
            method: 'post',
            data: {
                query: `
                    query {
                        ${query}(id: ${id}) {
                          ${this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field)).join('\n')}
                        }
                    }
                  `
            }
        }).then((response) => response.data.data[query]);
    }

    private toSingular(resourceGraphQL: string = this.resourceGraphQL) {
        return toSingular(resourceGraphQL);
    }

    private type: string = '';

    store(model: Model, type = 'create') {
        this.type = type;
        const mutation = this.generateParameters();
        this.isAResource = true;
        return axios({
            url: '/graphql',
            method: 'post',
            data: {
                query: `
                    mutation {
                        ${mutation}${this.parameters(model)} ${this.generateRequest(model)}
                    }
                  `
            }
        }).then((response) => {
            this.isAResource = false;
            if (this.isAEditableResource()) {
                return {
                    [`${this.fields[0].key.split('.')[0]}`]:  response.data.data[mutation]
                }
            }
            return response.data.data[mutation];
        });
    }

    private isAEditableResource() {
        return this.type == 'create' || this.type == 'update' && this.fatherID;
    }

    private parameters(model: Model) {
        if (this.type == 'create' && this.fatherID) {
            return `(${makeGraphqlParameters({
                [`${this.resourceGraphQL}_id`]: this.fatherID,
                ...model
            })})`;
        }
        return `(${makeGraphqlParameters(model)})`;
    }

    private generateParameters(): string {
        if (this.isAEditableResource()) {
            return camelize(`${this.type}  ${this.fields[0].key.split('.')[0]}`).replace(/ies/, 'y').replace(/s/, '');
        }
        return camelize(`${this.type} ${this.resourceGraphQL.replace(/_/g,' ')}`);
    }

    index(subCollection = 'active'): Promise<GraphQLIndexResponse> {
        this.subCollection = subCollection;
        return axios({
            url: '/graphql',
            method: 'post',
            data: {
                query: `query GetElementsToTable {
                     ${this.generateRequest()}
          }`
            }
        }).then((response) => {
            this.mapToDataframeIfSubResource(response, this.resourceGraphQL);
            return {
                resourceName: this.isASubResource ? response.data.data[this.resourceGraphQL].name.toLowerCase() : '',
                isASubResource: this.isASubResource,
                data: response.data.data[this.resourceGraphQL].data
            }
        })
    }

    private mapToDataframeIfSubResource(response: AxiosResponse, resourceGraphQL: string) {
        if (this.isASubResource) {
            response.data.data[resourceGraphQL].data = [];
            Object.keys(response.data.data[resourceGraphQL]).filter((key) => Array.isArray(response.data.data[resourceGraphQL][key])).forEach((key) => {
                if (key === 'data') {
                    return;
                }
                const map = response.data.data[resourceGraphQL][key].map((value: any) => {
                    return {
                        [`${key}`]: {
                            ...value
                        }
                    }
                });
                response.data.data[resourceGraphQL].data = response.data.data[resourceGraphQL].data.concat(map);
            });
        }
    }

    generateRequest(model?: Model) {
        if (this.isAEditableResource()) {
            return ` {
              ${createGqlQuery(model)}
            }
            `;
        }
        if (this.isAResource) {
            return ` {
                            id
                            name
                            ${this.subCollection}
                            ${this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field))}
                    }
        `
        }
        if (this.isASubResource) {
            return ` ${this.resource} {
                            id
                            name
                            ${this.subCollection}
                            ${this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field))}
                    }
        `
        }
        return `${this.resource} {
                          data {
                            id
                            ${this.subCollection}
                            ${this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field))}
                          }
       }
      `
    }
}

export function flattenObj(obj: any, parent: any, res: any = {}) {
    for (let key in obj) {
        let propName = key;
        if (typeof obj[key] == 'object') {
            flattenObj(obj[key], propName, res);
        } else {
            res[`${propName}`] = obj[key];
            if (typeof obj[key] == 'boolean') {
                res[es[propName] || propName] = obj[key] ? 'Sí' : 'No'
            }
        }
    }
    return res;
}
