import {MutationRepository} from "./siipTableRepository";
import gql from "graphql-tag";


export class GraphqlResourceFinderRepository implements MutationRepository {
    private fields: string[] | undefined;
    constructor(
        private _query: string,
        private _sub_query: string,
        private fragment: { index: string } = {
            index: ''
        },
        private editMutate?: string,
        private createMutate?: string,
        private updateInput?: string,
        private createInput?: string) {
    }

    public get foreign_key() {
        return `${this._query}_id`;
    }

    public get create() {
        return gql`
            mutation editResource($data: ${this.createInput}!) {
                ${this.createMutate} (data: $data) {
                id
            }
            }
        `
    }

    public get edit() {
        return gql`
            mutation editResource($data: ${this.updateInput}!) {
                ${this.editMutate} (data: $data) {
                id
            }
            }
        `
    }

    public query() {
        return gql`
            query getAcademicBodyById($id: ID) {
                ${this._query}(id: $id) {
                id
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
