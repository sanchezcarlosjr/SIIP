import {toGraphQL} from "../GraphQL";
import {ApolloRepository} from "./siipTableRepository";

export class ApolloSiipTableRepository implements ApolloRepository {
    query() {
        // @ts-ignore
        if (this.$route.params.id) {
            // @ts-ignore
            this.infoModal.model[this.resource.foreign_key]= this.$route.params.id;
        }
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
