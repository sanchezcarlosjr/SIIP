import {toGraphQL} from "../GraphQL";
import {ApolloRepository} from "./siipTableRepository";

export class ApolloSiipTableRepository implements ApolloRepository {
    query() {
        // @ts-ignore
        this.resource.setFields(this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field)));
        // @ts-ignore
        return this.resource.query();
    }

    update(data: any) {
        // @ts-ignore
        if (this.tableTitle) {
            // @ts-ignore
            this.title = this.resource.mark(this.tableTitle, data);
        }
        // @ts-ignore
        return this.resource.update(data);
    }
}
