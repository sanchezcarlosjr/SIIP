import {ApolloSiipTableRepository} from "./graphql";
import {ApolloRepository} from "./siipTableRepository";

export function adapt(repository: ApolloRepository = new ApolloSiipTableRepository()) {
    return {
        query: repository.query,
        update: repository.update,
        variables(): any {
            return {
                // @ts-ignore
                id: this.$route.params.id || this.resourceID
            }
        },
    };
}
