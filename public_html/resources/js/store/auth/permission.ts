import state from "../store";

export interface FormSchema {
    create?: any;
    edit?: any;
    read?: any;
    [key: string]: any;
}

export class Permission {
    constructor(private module: string, private formSchema: FormSchema) {
        if (
            !state.user.permissions[this.module]['edit'] &&
            state.user.permissions[this.module]['read'] &&
            !this.formSchema.hasOwnProperty('read')) {
            this.formSchema['read'] = this.formSchema.edit;
        }
        Object.keys(this.formSchema).filter((schema) => {
            return !state.user.permissions[this.module][schema];
        }).forEach((key: string) => delete this.formSchema[key]);
    }

    hasPermissions() {
        return this.formSchema;
    }
}
