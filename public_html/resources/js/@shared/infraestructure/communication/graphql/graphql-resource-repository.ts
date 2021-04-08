import gql from 'graphql-tag';
import {SiipTableRepository} from "./siipTableRepository";
import {camelize, toSingular} from "../GraphQL";

export class GraphqlResourceRepository implements SiipTableRepository {
    private fields: any;

    constructor(
        protected _query: string,
        private fragment: { index: string } = {
            index: ''
        },
        private editMutate?: string,
        private createMutate?: string,
        private updateInput?: string,
        private createInput?: string,
        private removeMutate?: string,
        private removeInput?: string) {
    }

    public get edit() {
        return gql`
            mutation editResource($data: ${this.updateInput}!) {
                ${this.editMutate} (data: $data) {
                ${this.fragment?.index}
                ${this.fields}
            }
            }
        `;
    }

    public get create() {
        return gql`
            mutation createNewResource($data: ${this.createInput}!) {
                ${this.createMutate} (data: $data) {
                ${this.fragment?.index}
                ${this.fields}
            }
            }
        `
    }

    public get remove() {
        return gql`
            mutation removeResource($data: ${this.removeInput}!) {
                ${this.removeMutate} (data: $data) {
                ${this.fragment?.index}
                ${this.fields}
            }
            }
        `;
    }

    static createDefaultRepository(query: string, fragment?: { index: string }) {
        const resource = toSingular(`${query}`);
        return new GraphqlResourceRepository(
            query,
            fragment,
            camelize(`update ${resource}`),
            camelize(`create ${resource}`),
            camelize(`update ${resource} input`),
            camelize(`create ${resource} input`),
            camelize(`destroy ${resource}`),
            camelize(`destroy ${resource} input`)
        );
    }

    public setFields(fields: any[]) {
        this.fields = fields;
    }

    public query() {
        return gql`query($filter: [String] = []) {
            ${this._query} {
            data {
                id
                ${this.fragment?.index}
                ${this.fields}
            }
        }
        }`;
    }

    update(data: any) {
        const query = this._query.split('(')[0];
        return data[query].data;
    }

}
