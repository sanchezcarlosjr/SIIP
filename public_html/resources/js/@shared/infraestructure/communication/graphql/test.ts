import gql from 'graphql-tag';
import {DocumentNode} from "graphql";

function snake_case2PascalCase(str: string): string {
  return str.split("_").map(s => s[0].toUpperCase() + s.slice(1)).join("");
}

export interface QueryParams {
  vars?: {
    name: string,
    type: string
  }[],
  args?: {
    name: string,
    value: string
  }[],
  fields?: string[],
  paginated?: boolean,
  singular?: boolean,
  opname?: string,
  optype?: string
}

interface ResourceName {
  plural: string,
  singular: string
}

export function key2field (fields: any) {
  return fields.map((field: any) => field.key);
}

export default class GraphQLResourceRepository {
  private root: ResourceName;
  private fields: string[];

  public constructor(root: ResourceName, fields: string[]) {
    this.root = root;
    this.fields = fields;
  }

  public get resource() {
    return this.root
  }

  public all({
    paginated = true,
    singular = false
  }: QueryParams) {
    arguments[0].paginated = paginated;
    arguments[0].singular = singular;
    arguments[0].opname = "all";
    return this._query(arguments[0]);
  }

  public get({
    paginated = false,
    singular = true
  }: QueryParams) {
    arguments[0].paginated = paginated;
    arguments[0].singular = singular;
    arguments[0].opname = "get";
    return this._query(arguments[0]);
  }

  public create({
    paginated = false,
    singular = true,
    args = [
      {
        name: "data",
        value: "$data"
      }
    ],
    vars = []
  }: QueryParams) {
    vars.push({
      name: "$data",
      type: snake_case2PascalCase(`create_${this.root.singular}_input`)
    });
    arguments[0].paginated = paginated;
    arguments[0].singular = singular;
    arguments[0].opname = "create";
    arguments[0].args = args;
    arguments[0].vars = vars;
    return this._mutate(arguments[0]);
  }

  public update({
    paginated = false,
    singular = true,
    args = [
      {
        name: "data",
        value: "$data"
      }
    ],
    vars = []
  }: QueryParams) {
    vars.push({
      name: "$data",
      type: snake_case2PascalCase(`update_${this.root.singular}_input`)
    });
    arguments[0].paginated = paginated;
    arguments[0].singular = singular;
    arguments[0].opname = "update";
    arguments[0].args = args;
    arguments[0].vars = vars;
    return this._mutate(arguments[0]);
  }

  public destroy({
    paginated = false,
    singular = true,
    args = [
      {
        name: "id",
        value: "$id"
      }
    ],
    vars = []
  }: QueryParams) {
    vars.push({
      name: "$id",
      type: "Int"
    });
    arguments[0].paginated = paginated;
    arguments[0].singular = singular;
    arguments[0].opname = "destroy";
    arguments[0].args = args;
    arguments[0].vars = vars;
    return this._mutate(arguments[0]);
  }

  private _operation({
    vars = [],
    args = [],
    fields = ["id"],
    paginated = false,
    singular = true,
    optype = "",
    opname = "none"
  }:QueryParams): DocumentNode {
    let _args = args.map(a => `${a.name}:${a.value}`);
    let _vars = vars.map(v => `${v.name}:${v.type}`);
    return gql`${optype} ${opname}_${singular?this.root.singular:this.root.plural}${_vars.length > 0?"(":""}${_vars.join(", ")}${_args.length > 0?")":""} {
      ${optype==="mutation"?`${opname}_`:""}${singular?this.root.singular:this.root.plural}${_args.length > 0?"(":""}${_args.join(", ")}${_args.length > 0?")":""} {
        ${paginated?"data {":""}
          ${this._parseFields(fields)}
        ${paginated?"}":""}
      }
    }`;
  }

  private _query({
    args = [],
    fields = ["id"],
    paginated = false,
    singular = true
  }:QueryParams) {
    arguments[0].optype = "query";
    return this._operation(arguments[0]);
  }

  private _mutate({
    args = [],
    fields = ["id"],
    paginated = false,
    singular = true
  }:QueryParams) {
    arguments[0].optype = "mutation";
    return this._operation(arguments[0]);
  }

  private _parseFields(fields: string[]): string {
    let arr: string[] = [];
    fields.forEach(field => {
      arr.push(this._parseField(field));
    });
    return arr.join(",");
  }

  private _parseField(field: string): string {
    let split = field.split(".");
    if (split.length === 1) {
      return split[0];
    }
    let resource = split.shift();
    let subresource = split.join(".");
    return `${resource} {
      ${this._parseField(subresource)}
    }`;
  }
}
