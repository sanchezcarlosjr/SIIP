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
            mutation removeResource($data: employeeToAcademicBodyInput) {
                removeEmployeesToAcademicBody (data: $data) {
                    id
                }
            }
        `
    }

    public find(id: string, fields: string[]) {
        console.log(id);
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
    map(item: any) {
        return {
            'id': item.id
        }
    }
}
