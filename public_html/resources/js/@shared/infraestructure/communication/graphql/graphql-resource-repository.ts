import gql from 'graphql-tag';
import {Repository} from "./repository";

export class GraphqlResourceRepository implements Repository {
    private fields: any;
    constructor(
        private _query: string,
        private editMutate: string,
        private createMutate: string,
        private updateInput: string,
        private createInput: string,
        private fragment: { index: string }) {
    }

    public get create() {
        return gql`
            mutation createNewResource($data: ${this.createInput}!) {
                ${this.createMutate} (data: $data) {
                ${this.fragment.index}
                ${this.fields}
            }
            }
        `
    }

    public get edit() {
        return gql`
            mutation editResource($data: ${this.updateInput}!) {
                ${this.editMutate} (data: $data) {
                ${this.fragment.index}
                ${this.fields}
            }
            }
        `
    }

    public setFields(fields: any[]) {
        this.fields = fields;
    }

    public query() {
        return gql`query {
            ${this._query} {
            data {
                id
                ${this.fragment.index}
                ${this.fields}
            }
        }
        }`;
    }

    update(data: any) {
        return data[this._query].data;
    }
}

