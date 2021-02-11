import {DocumentNode} from "graphql";

export interface Repository {
    query: () => DocumentNode;
    update: (data: any) => string;
}
