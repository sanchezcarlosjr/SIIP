import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";
import gql from "graphql-tag";

export class MembersRepository extends GraphqlSubResourceFinderRepository {
    public get create() {
        return gql`
            mutation editResource($data: employeeToAcademicBodyInput) {
                addEmployeesToAcademicBody (data: $data) {
                    id
                }
            }
        `
    }

    public get remove() {
        return gql`
            mutation removeResource($data: removeEmployeeToAcademicBodyInput) {
                removeEmployeesToAcademicBody (data: $data) {
                    id
                }
            }
        `
    }

    public find(id: string, fields: string[]) {
        return gql`
            query findResourceById {
                employee(nempleado: ${id}) {
                id
                ${fields}
            }
            }
        `;
    }

    public updateByFind(data: any) {
        // @ts-ignore
        return data['employee'];
    }

    // TODO: Remove this when info modal doesn't need it.
    public map = (item: any, route: any) => {
        if (!route) {
            return {
                academic_body_id: "",
                'id': item.id
            };
        }
        return {
            academic_body_id: route.params.id,
            'id': item.id
        };
    };
}
