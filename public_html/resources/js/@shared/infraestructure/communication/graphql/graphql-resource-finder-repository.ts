import {MutationRepository} from "./siipTableRepository";
import gql from "graphql-tag";
import {camelize, toSingular} from "../GraphQL";


export class GraphqlResourceFinderRepository implements MutationRepository {
    private fields: string[] | undefined;

    constructor(
        private _query: string,
        private _sub_query: string,
        private editMutate?: string,
        private createMutate?: string,
        private updateInput?: string,
        private createInput?: string,
        private fragment: { index: string } = {
            index: ''
        }) {
    }

    static createDefaultFinder(query: string, sub_query: string) {
        const resource = toSingular(`${sub_query}`);
        return new GraphqlResourceFinderRepository(
            query,
            sub_query,
            camelize(`update ${resource}`),
            camelize(`create ${resource}`),
            camelize(`update ${resource} input`),
            camelize(`create ${resource} input`)
        );
    }

    public get foreign_key() {
        return `${this._query}_id`;
    }

    mark(tableTitle: string, data: any) {
        return tableTitle.replace('*', data[this._query].name);
    }

    public get create() {
        return gql`
            mutation editResource($data: ${this.createInput}) {
                ${this.createMutate} (data: $data) {
                id
            }
            }
        `
    }

    public get edit() {
        return gql`
            mutation editResource($data: ${this.updateInput}) {
                ${this.editMutate} (data: $data) {
                id
            }
            }
        `
    }

    public query() {
        return gql`
            query getResourceById($id: ID) {
                ${this._query}(id: $id) {
                id
                name
                ${this._sub_query} {
                ${this.fields}
            }
            }
            }`;
    }

    public setFields(fields: any[]) {
        this.fields = fields;
    }

    update(data: any) {
        return data[this._query][this._sub_query];
    }
}
