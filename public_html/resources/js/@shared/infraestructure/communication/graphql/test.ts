import gql from 'graphql-tag';
import {DocumentNode} from "graphql";

interface QueryParams {
  args?: {
    name: string,
    value: string
  }[],
  fields?: string[],
  paginated?: boolean
}

export function key2field (fields: any) {
  return fields.map((field: any) => field.key);
}

export default class GraphQLResourceRepository {
  private root: string;

  public constructor(root: string) {
    this.root = root;
  }

  public query({
    args = [],
    fields = ["id"],
    paginated = false
  }:QueryParams) {
    let arr: string[] = [];
    args.forEach(arg => {
      arr.push(`${arg.name}:${arg.value}`);
    });
    return gql`query {
      ${this.root}${arr.length > 0?"(":""}${arr.join(", ")}${arr.length > 0?")":""} {
        ${paginated?"data {":""}
          ${GraphQLResourceRepository._parseFields(fields)}
        ${paginated?"}":""}
      }
    }`;
  }

  private static _parseFields(fields: string[]): string {
    let arr: string[] = [];
    fields.forEach(field => {
      arr.push(GraphQLResourceRepository._parseField(field));
    });
    return arr.join(",");
  }

  private static _parseField(field: string): string {
    let split = field.split(".");
    if (split.length === 1) {
      return split[0];
    }
    let resource = split.shift();
    let subresource = split.join(".");
    return `${resource} {
      ${GraphQLResourceRepository._parseField(subresource)}
    }`;
  }
}
