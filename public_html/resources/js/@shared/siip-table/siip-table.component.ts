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
import SiipTitle from './application/title.component.vue';
import PrintOptions from "./application/print-options.component.vue";

import {default as GQL, key2field} from "../../@shared/infraestructure/communication/graphql/test";

let fields = [
    {key: 'employee.name', label: 'Nombre', sortable: true},
    {key: 'employee.id', label: 'No. Empleado', sortable: true},
    {key: `employee.academic_unit.name`, label: 'Unidad Académica', sortable: true},
    {key: 'start_date', label: 'Fecha inicio', sortable: true},
    {key: 'finish_date', label: 'Fecha fin', sortable: true},
    {key: 'prodep_area.name', label: 'Área de conocimiento', sortable: true},
];

let repository = new GQL("prodep_profiles");

@Component({
    directives: {permission},
    components: {
        EditModalComponent,
        CreateModalComponent,
        RemoveModalComponent,
        SearcherComponent,
        SiipTitle,
        TablePresenter,
        PrintOptions
    },
    methods: {hasPermissions},
    apollo: {
        items: adapt()
        /*items: {
            query: repository.query({
              fields: key2field(fields),
              paginated: true
            }),
            update: data => data.prodep_profiles.data,
            prefetch: false,
            variables(): any {
                return {
                    // @ts-ignore
                    id: this.$route.params.id
                }
            }
        }*/
    }
})
export default class SiipTableComponent extends Vue {
    [x: string]: any;

    @Prop() rowClass: ((response: any) => string) | undefined;
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
    /** Filter by field.visible */
    tableFields: {}[] = this.fields.filter((field) => {
      return (field.label !== undefined && (field.visible??true))
    });
    criteria: string[] = [];
    items: any = [];
    sortBy = '';
    sortDesc = false;
    formOptions = {
        validateAsync: true,
        validateAfterLoad: false,
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
        this.hasUpload = this.schema?.fields?.filter((field: any) => field.type === 'upload2').length > 0;
        // @ts-ignore
        let params = (new URL(document.location)).searchParams;
        if (params.has('createResource')) {
            this.create(null);
        }
        this.toolbar.forEach((value) => {
            if (value === 'add') {
                return;
            }
            this.options.push(this.infoModal.getActions(value));
        });
    }

    optionClicked(event: { option: any, item: any }) {
        this[event.option.click](event.item.row, event.item.index);
    }

    execute(model: any) {
        // Common code to actions. Example: addElement, editElement, removeElement
        this[`${this.infoModal.id}Element`](model)
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

    details(item: any, index: any, button: any) {
        this.edit(item, index, button);
    }

    edit(item: any, index: any, button: any) {
        if (this.schema?.fields?.length === 0) {
            return;
        }
        if (this.toolbar.has('own-edit')) {
            this.$emit('edit', item.id);
            return;
        }
        this.infoModal.id = 'edit';
        if (this.links) {
            this.$router.push(Object.values(this.links)[0].link.replace('*', item.id));
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

    editElement(model: any) {
        return this.$apollo.mutate({
            mutation: this.resource.edit,
            variables: {
                data: {
                    ...model
                }
            }
        }).then(() =>
            this.$apollo.queries.items.refetch()
        )
            .then(() => this.showSuccessToast())
            .then(() => this.resetModal())
            .catch(() => this.showDangerToast());
    }

    public async filterItems(v: any) {
        await this.$apollo.queries.items.refetch({
            filter: v
        });
        let ignore: any = [];
        this.filter.forEach((filter:any) => {
          filter.criteria.forEach((criteria:any) => {
            ignore.push(criteria.value);
          });
        });
        v = v.filter((item:any) => {
          return ignore.indexOf(item) < 0;
        });

        if (v.length === 0) {
          return;
        }

        //@ts-ignore
        this.$apollo.data.items = this.$apollo.data.items.filter((item:any)=>{
          return this.fields.some((field: any)=>{
            let val = field.key.split(".").reduce((o:any, i:any)=>{
              if (o === null) {
                return null;
              } else {
                return o[i];
              }
            }, item);
            let found = false;
            v.forEach((query:any) => {
              let regex = new RegExp(".*" + query + ".*", "i");
              let test = regex.test(val);
              if (test) {
                found = true;
                return;
              }
            });
            return found;
          });
        });
    }

    get editModalSize() {
        if (this.toolbar.has('edit-xl')) {
            return 'xl';
        }
        if (this.toolbar.has('edit-lg')) {
            return 'lg';
        }
        if (this.toolbar.has('edit-sm')) {
            return 'sm';
        }
        return '';
    }

    createElement(model: any) {
        this.$apollo.mutate({
            mutation: this.resource.create,
            variables: {
                data: {
                    ...model,
                    academic_body_id: this.$route.params.id
                },
            },
            context: {
                hasUpload: this.hasUpload
            }
        }).then(async (element) => {
                await this.$apollo.queries.items.refetch();
                return element;
            }
        )
            .then((element) => {
                this.$emit('created-element', element['data']);
            })
            .then(() => this.showSuccessToast())
            .then(() => this.resetModal())
            .catch(() => this.showDangerToast());
    }

    private toggleChart() {
        this.isVisibleChart = !this.isVisibleChart;
    }

    private showModal(item: any, index: any, button: any) {
        this.infoModal.setModal(item, index);
        this.$root.$emit('bv::show::modal', `${this.infoModal.id}`, button);
    }

    private removeElement() {
        return this.$apollo.mutate({
            mutation: this.resource.remove,
            variables: {
                data: {
                    ...this.infoModal.adaptMapToRemove(this.resource, this.$route),
                }
            }
        }).then(() => this.$apollo.queries.items.refetch());
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
