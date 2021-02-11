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
                    name
                    ${this.fields}
                }
            }
        }`;
    }

    update(data: { academic_bodies: { data: any; }; }) {
        return data.academic_bodies.data;
    }
}

