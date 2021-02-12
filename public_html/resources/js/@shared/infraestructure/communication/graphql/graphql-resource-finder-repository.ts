import {MutationRepository} from "./siipTableRepository";
import gql from "graphql-tag";


export class GraphqlResourceFinderRepository implements MutationRepository {
    private fields: string[] | undefined;
    constructor(
        private _query: string,
        private fragment: { index: string } = {
            index: ''
        },
        private editMutate?: string,
        private createMutate?: string,
        private updateInput?: string,
        private createInput?: string) {
    }

    public get foreign_key() {
        return `academic_body_id`;
    }

    public get create() {
        return gql`
            mutation editResource($data: createLgacInput!) {
                createLgac (data: $data) {
                    id
                }
            }
        `
    }

    public get edit() {
        return gql`
            mutation editResource($data: updateLgacInput!) {
                updateLgac (data: $data) {
                    id
              }
            }
        `
    }

    public query() {
        return gql`
            query getAcademicBodyById($id: ID) {
                academic_body(id: $id) {
                    id
                    lgacs {
                        ${this.fields}
                    }
                }
            }`;
    }

    public setFields(fields: any[]) {
        this.fields = fields;
    }

    update(data: any) {
        return data['academic_body']['lgacs'];
    }
}
