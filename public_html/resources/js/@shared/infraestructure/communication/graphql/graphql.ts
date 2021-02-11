import {toGraphQL} from "../GraphQL";

export class GraphqlRepository {
    query() {
        // @ts-ignore
        this.resource.setFields(this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field)));
        // @ts-ignore
        return this.resource.query();
    }

    update(data: any) {
        // @ts-ignore
        return this.resource.update(data);
    }
}
