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
    isBusy = false;
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
    perPage = 10;
    currentPage = 1;
    sortBy = '';
    sortDesc = false;
    sortDirection = 'asc';
    infoModal: InfoModal = new InfoModal(this.schema, this.resource);
    isVisibleChart = false;
    private originalFilter: string[] = [];
    private graphQLBuilder: GraphQLBuilder | undefined;

    get sortOptions() {
        return this.fields
            .filter(field => field.sortable)
            .map(field => {
                return {text: field.label, value: field.key}
            })
    }

    get rows() {
        return this.items.length;
    }

    get chartIcon() {
        return this.isVisibleChart ? ['fas', 'chevron-up'] : ['fas', 'chevron-down'];
    }

    async index(ctx: any, callback: any) {
        this.isBusy = true;
        return this.loadElements();
    }

    async mounted() {
        this.infoModal.build(this.spanishResourceName);
        await this.loadElements();
        this.criteria.push(...this.filter.filter((f) => f.default).map((f) => f.value));
        this.originalFilter.push(...this.filter.filter((f) => f.default || !f.default).map((f) => f.value));
    }

    async loadElements() {
        // TODO: Migrate to GraphQL
        if (this.communicationType === 'REST') {
            axios.get(`/api/${this.resource}`).then(
                (response) => {
                    this.items = response.data;
                    this.title = this.tableTitle;
                    return response.data;
                }
            );
        }
        if (this.communicationType === 'GraphQL') {
            this.graphQLBuilder = new GraphQLBuilder(`${this.resource}`, this.fields, this.$route.params.id);
            return this.graphQLBuilder.index().then(async (response) => {
                this.items = response.data;
                if (typeof this.infoVariant === 'function') {
                    const id = await this.infoVariant(this.items);
                    this.items[id]._rowVariant = 'info';
                }
                if (!this.tableTitle) {
                    return this.items;
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
                return this.items;
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

    rowClicked(item: any, index: number, event: any) {
        this.infoModal.id = 'edit';
        this.infoModal.setModal(item, index);
        return this.links ? this.$set(item, '_showDetails', !item._showDetails) : '';
    }

    options = [
        {
            name: 'A'
        }
    ];

    optionClicked() {
    }

    rowContextMenu(item: any, index: number, event: any) {
        // @ts-ignore
        this.$refs.vueSimpleContextMenu1.showMenu(event, item);
    }


    toBeatyItem(item: any) {
        return flattenObj(item, '');
    }

    private toggleChart() {
        this.isVisibleChart = !this.isVisibleChart;
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
            .then((element) => this.items.push(element));
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
        this.infoModal.model['active'] = false;
        return this.editElement();
    }

    private editElement() {
        const rowId = this.infoModal.rowId;
        const isASubResource = this.infoModal.isASubResource;
        if (this.communicationType === 'GraphQL') {
            return this.graphQLBuilder?.store(this.infoModal.model, 'update').then((result) =>
                this.updateTable(result, rowId, isASubResource)
            );
        }
        return axios.put(`api/${this.resource}/${this.infoModal.itemId}`, {
            ...this.infoModal.model
        });
    }

    private updateTable(result: any, rowId: number, isASubResource: boolean) {
        for (const key of Object.keys(result) as string[]) {
            if (isASubResource) {
                this.items[rowId][Object.keys(this.items[rowId])[0]][key] = result[key];
            } else {
                this.items[rowId][key] = result[key];
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

