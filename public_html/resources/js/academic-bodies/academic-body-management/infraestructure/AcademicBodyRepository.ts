import gql from 'graphql-tag';
import {Repository} from "../../../@shared/infraestructure/communication/graphql/repository";

export class AcademicBodyRepository implements Repository {
    private fields: any;

    public setFields(fields: any[]) {
        this.fields = fields;
    }

    public query() {
        return gql`query {
            academic_bodies {
                data {
                    id
                    active
                    name
                    ${this.fields}
                }
            }
        }`;
    }

    public get create() {
        return gql`
            mutation createNewAcademicBody($data: createAcademicBodyInput!) {
                createAcademicBodies(data: $data) {
                    active
                    name
                    ${this.fields}
                }
            }
        `
    }

    public get edit() {
        return gql`
            mutation editNewAcademicBody($data: updateAcademicBodyInput!) {
                updateAcademicBodies(data: $data) {
                    active
                    name
                    ${this.fields}
                }
            }
        `
    }

    update(data: { academic_bodies: { data: any; }; }) {
        return data.academic_bodies.data;
    }
}

