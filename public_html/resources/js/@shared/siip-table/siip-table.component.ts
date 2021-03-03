import Vue from "vue";
import {Component, Prop} from 'vue-property-decorator';
import {InfoModal} from './info-modal';
import {hasPermissions, permission} from "../../store/auth/permission";
import {adapt} from "../infraestructure/communication/graphql/graphql-adapter";
import {SiipTableRepository} from "../infraestructure/communication/graphql/siipTableRepository";
import EditModalComponent from './application/edit-modal.component.vue';
import CreateModalComponent from './application/create-modal.component.vue';
import RemoveModalComponent from './application/remove-modal.component.vue';
import TablePresenter from './application/table-presenter.component.vue';
import SearcherComponent from './application/searcher.component.vue';

@Component({
    directives: {permission},
    components: {
        EditModalComponent,
        CreateModalComponent,
        RemoveModalComponent,
        SearcherComponent,
        TablePresenter
    },
    methods: {hasPermissions},
    apollo: {
        items: adapt()
    }
})
export default class SiipTableComponent extends Vue {
    [x: string]: any;
    @Prop() infoVariant!: (response: any) => Promise<number>;
    @Prop() resource!: SiipTableRepository;
    @Prop() fields!: any[];
    @Prop() spanishResourceName!: string;
    @Prop({
        default() {
            return {
                fields: []
            }
        }
    }) schema!: any;
    @Prop() links!: Object;
    @Prop({
        default() {
            return []
        }
    }) filter!: { default: boolean; value: string }[];
    @Prop({default: () => new Set(['add', 'remove', 'edit'])}) toolbar!: Set<string>;
    tableFields: {}[] = this.fields.filter((field) => field.label);
    criteria: string[] = [];
    items: any = [];
    sortBy = '';
    sortDesc = false;
    okDisabled = true;
    formOptions = {
        validateAsync: true,
        validateAfterLoad: true,
        validateAfterChanged: true
    };
    sortDirection = 'asc';
    infoModal: InfoModal = new InfoModal(this.schema, this.resource);
    isVisibleChart = false;
    options: any[] = [];
    originalFilter: string[] = [];

    get sortOptions() {
        return this.fields
            .filter(field => field.sortable)
            .map(field => {
                return {text: field.label, value: field.key}
            })
    }

    get chartIcon() {
        return this.isVisibleChart ? ['fas', 'chevron-up'] : ['fas', 'chevron-down'];
    }

    async mounted() {
        this.infoModal.build(this.spanishResourceName);
        this.toolbar.forEach((value) => {
            if (value === 'add' || value === 'add-relation') {
                return;
            }
            this.options.push(this.infoModal.getActions(value));
        });
    }

    onValidated(isValid: boolean) {
        this.okDisabled = !isValid;
    }

    optionClicked(event: { option: any, item: any }) {
        this[event.option.click](event.item.row, event.item.index);
    }


    execute() {
        // Common code to actions. Example: addElement, editElement, removeElement
        this[`${this.infoModal.id}Element`]()
            .then(() => this.showSuccessToast())
            .then(() => this.resetModal())
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
        if (this.schema.fields.length === 0 || !this.toolbar.has('edit')) {
            return;
        }
        this.infoModal.id = 'edit';
        if (this.links) {
            this.$router.push(`/cuerpos-academicos/${item.id}/editar`);
            return;
        }
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

    private toggleChart() {
        this.isVisibleChart = !this.isVisibleChart;
    }

    private showModal(item: any, index: any, button: any) {
        this.infoModal.setModal(item, index);
        this.$root.$emit('bv::show::modal', `${this.infoModal.id}`, button);
    }

    private createElement() {
        return this.$apollo.mutate({
            mutation: this.resource.create,
            variables: {
                data: {
                    ...this.infoModal.model
                }
            }
        })
            .then(() =>
                this.$apollo.queries.items.refetch()
            )
    }

    private removeElement() {
        return this.$apollo.mutate({
            mutation: this.resource.remove,
            variables: {
                data: {
                    id: this.infoModal.model.id
                }
            }
        }).then(() => this.$apollo.queries.items.refetch());
    }

    private editElement() {
        return this.$apollo.mutate({
            mutation: this.resource.edit,
            variables: {
                data: {
                    ...this.infoModal.model
                }
            }
        }).then(() =>
            this.$apollo.queries.items.refetch()
        );
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

