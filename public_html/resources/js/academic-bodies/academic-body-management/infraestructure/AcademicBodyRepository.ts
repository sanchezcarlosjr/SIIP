import gql from 'graphql-tag';
import {toGraphQL} from "../../../@shared/infraestructure/communication/GraphQL";


function factory(t: any) {
    console.log(t);
    return new AcademicBodyRepository('')
}

export class GraphqlRepository {
    query() {
        // @ts-ignore
        return new AcademicBodyRepository(this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field))).query();
    }
    update(data: any) {
        // @ts-ignore
        return new AcademicBodyRepository(this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field))).update(data);
    }
}

export class AcademicBodyRepository {
    constructor(private fields: any) {
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

export function adapt() {
    let repository: GraphqlRepository = new GraphqlRepository();
    return {
        query: repository.query,
        update: repository.update
    };
}
