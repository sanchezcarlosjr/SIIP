import state from "../store";

export function hasPermissions(roles: string[]) {
    const permissions = new Set<string>(roles);
    return true;
}


class Rol {
    constructor(private module: string, private formSchema: { create?: any, edit: any }) {
    }
    hasPermissions() {
        return Object.keys(this.formSchema).filter((schema) => state.user.permissions[this.module][schema]);
    }
}
