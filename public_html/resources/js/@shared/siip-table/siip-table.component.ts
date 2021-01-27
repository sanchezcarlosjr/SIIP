import axios from 'axios';
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from 'vue-property-decorator';
import {flattenObj, GraphQLBuilder} from './GraphQL';
import {InfoModal} from './info-modal';


@Component
export default class SiipTableComponent extends Vue {
    [x: string]: any;

    @Prop() infoVariant!: (response: any) => Promise<number>;
    @Prop() resource!: string;
    @Prop() fields!: any[];
    @Prop() tableTitle!: string;
    tableFields: {}[] = this.fields.filter((field) => field.label);
    title = 'Cargando...';
    @Prop({default: '\n'}) subCollections!: string;
    @Prop() spanishResourceName!: string;
    @Prop({default: 'REST'}) communicationType!: string;
    @Prop({
        default() {
            return {
                fields: [
                    {
                        type: '',
                        label: '',
                        model: "",
                        query: '',
                        textKey: ''
                    },
                ]
            }
        }
    }) schema!: any;
    @Prop() links!: Object;
    @Prop({
        default() {
            return []
        }
    }) filter!: { default: boolean; value: string }[];
    criteria: string[] = [];
    @Prop({default: () => new Set(['add', 'remove', 'edit'])}) toolbar!: Set<string>;
    items: any = [];
    sortBy = '';
    sortDesc = false;
    sortDirection = 'asc';
    infoModal: InfoModal = new InfoModal(this.schema, this.resource);
    private originalFilter: string[] = [];
    private graphQLBuilder: GraphQLBuilder | undefined;

    get sortOptions() {
        return this.fields
            .filter(field => field.sortable)
            .map(field => {
                return {text: field.label, value: field.key}
            })
    }

    mounted() {
        this.infoModal.build(this.spanishResourceName);
        this.criteria.push(...this.filter.filter((f) => f.default).map((f) => f.value));
        this.index();
        this.originalFilter.push(...this.filter.filter((f) => f.default || !f.default).map((f) => f.value));
    }

    async index() {
        // TODO: Migrate to GraphQL
        if (this.communicationType === 'REST') {
            axios.get(`/api/${this.resource}`).then(
                (response) => {
                    this.items = response.data;
                    this.title = this.tableTitle;
                }
            );
        }
        if (this.communicationType === 'GraphQL') {
            this.graphQLBuilder = new GraphQLBuilder(this.resource, this.fields, this.$route.params.id);
            this.graphQLBuilder.index().then(async (response) => {
                this.items = response.data;
                if (typeof this.infoVariant === 'function') {
                    const id = await this.infoVariant(this.items);
                    this.items[id]._rowVariant = 'info';
                }
                if (!this.tableTitle) {
                    return;
                }
                const isAInjectedElement = this.tableTitle.indexOf('*') !== -1;
                if (isAInjectedElement) {
                    const injectedSymbolByAttribute: RegExp = /\*[a-z_.]+/gi;
                    if (typeof response.resourceName === "string") {
                        this.title = this.tableTitle.replace(injectedSymbolByAttribute, response.resourceName);
                    }
                } else {
                    this.title = this.tableTitle;
                }
            });
        }
    }

    execute() {
        // Common code to actions. Example: addElement, editElement, removeElement
        this[`${this.infoModal.id}Element`]()
            .then(() => this.showSuccessToast())
            .catch(() => this.showDangerToast());
    }

    search(row: any, criteria: string[]) {
        const values: string[] = Object.values(row);
        const valueString = values.toString();
        return criteria.filter(value => {
            return valueString.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        }).length > 0;
    }

    add(button: any) {
        this.create(button);
        this.infoModal.id = 'addRelation';
    }

    create(button: any) {
        this.infoModal.id = 'create';
        this.showModal(null, null, button);
    }

    edit(item: any, index: any, button: any) {
        this.infoModal.id = 'edit';
        this.showModal(item, index, button);
    }

    removeRelation(item: any, index: any, button: any) {
        this.infoModal.id = 'removeRelation';
        this.showModal(item, index, button);
    }

    remove(item: any, index: any, button: any) {
        this.infoModal.id = 'remove';
        this.showModal(item, index, button);
    }

    archive(item: any, index: any, button: any) {
        this.infoModal.id = 'archive';
        this.showModal(item, index, button);
    }

    resetModal() {
        this.infoModal.reset();
    }

    toBeatyItem(item: any) {
        return flattenObj(item, '');
    }

    private showModal(item: any, index: any, button: any) {
        this.infoModal.setModal(item, index);
        this.$root.$emit('bv::show::modal', `${this.infoModal.id}`, button)
    }

    private removeElement() {
        this.items.splice(this.infoModal.rowId, 1);
        if (this.communicationType === 'GraphQL') {
            return this.graphQLBuilder?.remove(this.resourceGraphQL, this.infoModal.itemId);
        }
        return axios.delete(`api/${this.resource}/${this.infoModal.itemId}`);
    }

    private addRelationElement() {
        return this.graphQLBuilder?.store({
            id: this.$route.params.id,
            ...this.infoModal.model
        }, `add ${this.schema.fields[0].query} to`)
            .then((element) => this.index());
    }

    private removeRelationElement() {
        this.items.splice(this.infoModal.rowId, 1);
        return this.graphQLBuilder?.store({
            id: this.$route.params.id,
            [`${this.schema.fields[0].query}_id`]: this.infoModal.item[this.schema.fields[0].query].id
        }, `remove ${this.schema.fields[0].query} to`);
    }

    private createElement() {
        if (this.communicationType === 'GraphQL') {
            return this.graphQLBuilder?.store(this.infoModal.model, this.infoModal.id)
                .then((element) => this.items.push(element));
        }
        return axios.post(`api/${this.resource}`, {
            ...this.infoModal.model
        }).then((element) => this.items.push(element.data));
    }

    private archiveElement() {
        this.updateTable();
        if (this.communicationType === 'GraphQL') {
            return this.graphQLBuilder?.store({
                id: this.infoModal.itemId,
                active: !this.infoModal.model['active']
            }, 'update');
        }
        return axios.put(`api/${this.resource}/${this.infoModal.itemId}`, {
            active: false
        });
    }

    private editElement() {
        this.updateTable();
        if (this.communicationType === 'GraphQL') {
            return this.graphQLBuilder?.store(this.infoModal.model, 'update');
        }
        return axios.put(`api/${this.resource}/${this.infoModal.itemId}`, {
            ...this.infoModal.model
        });
    }

    private updateTable() {
        for (const key of Object.keys(this.infoModal.model) as string[]) {
            if (this.infoModal.isASubResource) {
                this.items[this.infoModal.rowId][Object.keys(this.items[this.infoModal.rowId])[0]][key] = this.infoModal.model[key];
            } else {
                this.items[this.infoModal.rowId][key] = this.infoModal.model[key];
            }
        }
    }

    private showSuccessToast() {
        this.$bvToast.toast(`Su operación fue exitosa`, {
            title: 'Operación exitosa',
            variant: 'success',
            solid: true
        })
    }

    private showDangerToast() {
        this.$bvToast.toast(`Compruebe los datos.`, {
            title: 'Problemas en la operación',
            variant: 'danger',
            solid: true
        })
    }

}

