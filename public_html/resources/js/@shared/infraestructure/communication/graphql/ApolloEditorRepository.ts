import {ApolloDefaultRepository} from "./ApolloDefaultRepository";
import {DocumentNode} from "graphql";

export class ApolloEditorRepository extends ApolloDefaultRepository {
    constructor() {
        super("resource");
    }

    query(): () => DocumentNode {
        const I = this;
        return function () {
            // @ts-ignore
            return this[I.resourceName].find(this.itemId || 0, I.mapFieldsToQuery(this));
        };
    }

    update(): (data: any) => DocumentNode {
        const I = this;
        return function (data: any) {
            // @ts-ignore
            return I.mapDataToUpdate(this[I.resourceName].updateByFind(data), this);
        }
    }

    mapFieldsToQuery(component: any) {
        const schema = component.schema;
        const fields: { model: string }[] = schema.fieldsToFind || schema.fields;
        return fields.map((field) => field.model);
    }
}
