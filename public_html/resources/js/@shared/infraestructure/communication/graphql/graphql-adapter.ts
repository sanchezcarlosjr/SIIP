import {GraphqlRepository} from "./graphql";

export function adapt() {
    let repository: GraphqlRepository = new GraphqlRepository();
    return {
        query: repository.query,
        update: repository.update
    };
}
