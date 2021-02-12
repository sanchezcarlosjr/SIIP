import {hasPermissions} from "../../store/auth/permission";
import {toSingular} from "../infraestructure/communication/GraphQL";

interface Modal {
    id: string,
    title: string,
    item: any,
    rowId: number
}

export interface Strategy {
    [key: string]: () => { title: string, icon: string };
}

export interface Model {
    [key: string]: any;
}
interface Schema {
    fields: { model: string, query: string, module: string }[];
}

export class InfoModal implements Modal {
    private strategies: Strategy = {
        editCollapse: () => {
            return {
                icon: 'edit',
                title: `Detalles de `
            }
        },
        remove: () => {
            return {
                icon: 'trash',
                title: 'Eliminar'
            }
        },
        edit: () => {
            return {
                icon: 'edit',
                title: hasPermissions(['admin']) ? 'Editar' : 'Detalles'
            }
        },
        create: () => {
            return {
                icon: '',
                title: 'Añadir'
            }
        },
        archive: () => {
            return {
                icon: 'archive',
                title: 'Archivar'
            }
        },
        removeRelation: () => {
            return {
                title: 'Remover',
                icon: 'trash'
            }
        }
    };
    private _id: string = '';
    title = '';
    item: any = null;
    model: Model = {};
    action = '';
    rowId = -1;
    isASubResource = false;
    resource = '';
    private module = '';
    constructor(private schema: Schema, private apiResource: string) {
        this.loadModel();
    }
    build(spanishResourceName: string = document.title.replace(/s/g, '').toLowerCase()) {
        this.resource = spanishResourceName;
    }

    reset() {
        this.title = '';
        this.item = null;
        this.rowId = -1;
        if (this.model.id === '') {
            delete this.model.id;
        }
        for (const key of Object.keys(this.model) as string[]) {
            this.model[key] = '';
        }
    }

    set id(id: string) {
        this._id  = id;
    }

    get id() {
        return this._id;
    }

    setModal(item: any, index: any) {
        const strategy = this.strategies[this.id]().title;
        this.title = `${strategy} ${this.resource}`;
        this.rowId = index;
        this.ifItemThenMatchSchema(item);
    }

    addKeys(keys: any) {
        this.model = {
            ...this.model,
            keys
        };
    }

    private ifItemThenMatchSchema(item: any) {
        if (!item) {
            return;
        }
        this.item = item;
        this.model.id = this.itemId;
        for (const key of Object.keys(this.item) as string[]) {
            if (this.model[key] === '') {
                this.model[key] = this.item[key];
            }
        }
    }

    loadModel() {
        this.schema.fields.forEach((field: any) => {
            field.readonly = !hasPermissions(['admin']);
            this.model[field.model] = '';
        });
    }

    getActions(value: string) {
        const strategy = this.strategies[value]();
        return {
            click: value,
            name: `
           <a>
                  <i class="fas fa-${strategy.icon}"></i>
                   ${strategy.title} ${this.resource}
           </a>`
        };
    }

    loadSchema() {
        this.schema.fields.forEach((field) => field.module = this.module);
    }

    get itemId() {
        return this.item?.id;
    }
}
