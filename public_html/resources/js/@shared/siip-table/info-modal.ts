interface Modal { id: string, title: string, content: string, item: any, rowId: number };

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
    content = '';
    resource = document.title.replace(/s/g, '').toLowerCase();
    reset() {
        this.title = '';
        this.content = '';
        this.item = null;
        this.rowId = -1;
    }
    setModal(item: any, index: any) {
        this.item = item;
        const strategy = this.strategies[this.id]();
        this.title = `${strategy} ${this.resource}`;
        this.rowId = index;
        this.content = JSON.stringify(item, null, 2)
    }
    loadModel(schema: Schema) {
        schema.fields.forEach((field) => this.model[field.model] = '');
    }
    get itemId() {
        return this.item?.id;
    }
}