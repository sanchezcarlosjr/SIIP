import {ApolloSiipTableRepository} from "./graphql";
import {ApolloRepository} from "./siipTableRepository";
import gql from "graphql-tag";

export function adapt(repository: ApolloRepository = new ApolloSiipTableRepository()) {
    return {
        query: repository.query,
        update: repository.update,
        variables (): any {
            return {
                // @ts-ignore
                id: this.$route.params.id
            }
        },
    };
}


export function adaptTitleModal() {
    return {
        result ({ data, loading }: any) {
             // @ts-ignore
             this.infoModal.title = `${data['academic_body'].prodep_key} ${data['academic_body'].name}`;
        },
        manual: true,
        variables (): any {
            return {
                // @ts-ignore
                id: this.$route.params.id
            }
        },
        query: gql`
            query getResourceById($id: ID) {
                academic_body(id: $id) {
                  name
                  prodep_key
                }
            }`
    };
}
