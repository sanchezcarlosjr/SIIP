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

    public get edit() {
        return gql`
            mutation editResource($data: employeeToAcademicBodyInput) {
                removeEmployeesToAcademicBody (data: $data) {
                    id
                }
            }
        `
    }

    map(item: any) {
        return {
            'employees_id': item.id
        }
    }
}
