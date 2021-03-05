import {toGraphQL} from "../GraphQL";
import {ApolloDefaultRepository} from "./ApolloDefaultRepository";

export class ApolloSiipTableRepository extends ApolloDefaultRepository {
    constructor() {
        super("resource");
    }

    map(component: any) {
        // @ts-ignore
        return component.fields.filter((field) => field.sortable).map((field) => toGraphQL(field));
    }
}
