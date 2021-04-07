import {hasPermissions} from "../../store/auth/permission";
import {SiipTableRepository} from "../infraestructure/communication/graphql/siipTableRepository";

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
    private _model: Model = {};
    model: Model = {};
    action = '';
    rowId = -1;
    isASubResource = false;
    resource = '';
    private module = '';

    constructor(private schema: Schema, private apolloRepository: SiipTableRepository) {
        this.loadModel();
    }

    build(spanishResourceName: string = document.title.replace(/s/g, '').toLowerCase()) {
        this.resource = spanishResourceName;
    }

    get id() {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    reset() {
        this.title = '';
        this.item = null;
        this.rowId = -1;
        this.model = {
            ...this._model
        };
    }

    setModal(item: any, index: any) {
        if (!this.strategies[this._id]) {
            return;
        }
        const strategy = this.strategies[this._id]().title;
        this.title = `${strategy} ${this.resource}`;
        this.rowId = index;
        this.ifItemThenMatchSchema(item);
    }

    addToModel(parameters: { routeID: string }) {
        if (parameters.routeID) {
            // @ts-ignore
            this.model[this.apolloRepository.foreign_key] = parameters.routeID;
        }
    }

    loadModel() {
        this.schema.fields.forEach((field: any) => {
            field.readonly = !hasPermissions(['admin']);
            this.model[field.model] = '';
            this._model[field.model] = '';
        });
    }

    getActions(value: string) {
        if (!this.strategies[this._id]) {
            return '';
        }
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

    adaptMapToRemove(resource: any, route: any) {
        if (!resource.map) {
            return {
                id: this.model.id
            };
        }
        if (!this.item) {
        }
        return {
            academic_body_id: route.params.id,
            ...resource.map(this.item)
        };
    }

    private ifItemThenMatchSchema(item: any) {
        if (!item) {
            return;
        }
        // @ts-ignore
        this.item = this.apolloRepository.map ? this.apolloRepository.map(item) : item;
        this.model.id = this.itemId;
        for (const key of Object.keys(this.item) as string[]) {
            if (this.model[key] === '') {
                this.model[key] = this.item[key];
            }
        }
    }

    get itemId() {
        return this.item?.id;
    }
}
