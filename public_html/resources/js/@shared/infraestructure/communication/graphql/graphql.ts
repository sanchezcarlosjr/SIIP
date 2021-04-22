import {toGraphQL} from "../GraphQL";
import {ApolloDefaultRepository} from "./ApolloDefaultRepository";

export class ApolloSiipTableRepository extends ApolloDefaultRepository {
    constructor() {
        super("resource");
    }

    mapFieldsToQuery(component: any) {
        // @ts-ignore
        return component.fields.filter((field) => field.sortable || field.column).map((field) => toGraphQL(field));
    }

    mapDataToUpdate(data: any, component: any) {
        const columns: any = {};
        component.fields.filter((field: any) => field.column).forEach((field: any) => {
                data.forEach((item: any) =>
                    item[field.column].forEach((column: any) => {
                        columns[column.id] = column.name;
                        item._cellVariants = { [`${column.id}`]: 'success' }
                    })
                );
            }
        );
        for (const id in columns) {
            component.tableFields.push({key: id, label: columns[id]});
        }
        return data;
    }

}
