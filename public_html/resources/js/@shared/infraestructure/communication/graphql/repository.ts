import {DocumentNode} from "graphql";

export interface Repository {
    create: DocumentNode;
    query: () => DocumentNode;
    edit: DocumentNode;
    update: (data: any) => string;
    setFields: (fields: any[]) => void;
}
