import {ApolloRepository} from "./siipTableRepository";
import {DocumentNode} from "graphql";

export abstract class ApolloDefaultRepository implements ApolloRepository {
    protected constructor(protected resourceName: string) {
    }

    query(): DocumentNode {
        const I = this;
        // @ts-ignore
        return function () {
            // @ts-ignore
            this[I.resourceName].setFields(I.map(this));
            // @ts-ignore
            return this[I.resourceName].query();
        };
    }

    abstract map(component: any): string[];

    update(): any {
        const I = this;
        return function (data: any) {
            // @ts-ignore
            return this[I.resourceName].update(data);
        }
    }
}
