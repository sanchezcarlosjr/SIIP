interface Modal { id: string, title: string, item: any, rowId: number };

export interface Strategy {
    [key: string]: () => string;
}

export interface Model {
    [key: string]: string;
}
interface Schema {
    fields: { model: string }[];
}

export class InfoModal implements Modal {
    private strategies: Strategy = {
        remove: () => 'Eliminar',
        edit: () => 'Editar ',
        add: () => 'Añadir'
    };
    id: string = '';
    title = '';
    item: any = null;
    model: Model = {};
    rowId = -1;
    private resource = '';
    build(schema: Schema, spanishResourceName: string = document.title.replace(/s/g, '').toLowerCase()) {
        this.resource = spanishResourceName;
        this.loadModel(schema);
    }
    reset() {
        this.title = '';
        this.item = null;
        this.rowId = -1;
        for (const key of Object.keys(this.model) as string[]) {
            this.model[key] = '';
        }
    }
    setModal(item: any, index: any) {
        this.item = item;
        const strategy = this.strategies[this.id]();
        this.title = `${strategy} ${this.resource}`;
        this.rowId = index;
        if (this.item) {
            for (const key of Object.keys(this.item) as string[]) {
                this.model[key] = this.item[key];
            }
        }
    }
    loadModel(schema: Schema) {
        schema.fields.forEach((field) => this.model[field.model] = '');
    }
    get itemId() {
        return this.item?.id;
    }
}