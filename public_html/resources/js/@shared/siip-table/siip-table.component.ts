import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import {hasPermissions, permission} from "../../store/auth/permission";
import TablePresenter from './application/table-presenter.component.vue';
import SearcherComponent from './application/searcher.component.vue';
import SiipTitle from './application/title.component.vue';
import PrintOptions from "./application/print-options.component.vue";
import GraphQLResourceRepository from "../../@shared/infraestructure/communication/graphql/test";
import FormModal from "../../@shared/application/form-modal/form-modal.component.vue";

@Component({
    directives: {permission},
    components: {
        SearcherComponent,
        SiipTitle,
        TablePresenter,
        PrintOptions,
        FormModal
    },
    methods: {hasPermissions}
})
export default class SiipTableComponent extends Vue {
  @Prop() resource!: GraphQLResourceRepository;
  @Prop({default: ()=>[]}) filter!: any[]; //ToDo Type

  private _selectedFilters: any[] = []; //ToDo Type
  private _routeArgs: any[] = [];

  @Prop() fields!: any[]; // Table Fields
  _fields: string[] = []; // Query Fields
  @Prop() formSchemas!: any; //ToDo Type

  /** Literally form options */
  formOptions = {
      validateAsync: true,
      validateAfterLoad: false,
      validateAfterChanged: true
  };

  //@ts-ignore
  @Ref(FormModal.Type.Create) createForm!: Vue & {
    fetch: (id: number)=>void;
  }
  //@ts-ignore
  @Ref(FormModal.Type.Read) readForm!: Vue & {
    fetch: (id: number)=>void;
  }
  //@ts-ignore
  @Ref(FormModal.Type.Update) updateForm!: Vue & {
    fetch: (id: number)=>void;
  }
  /** Workaround */
  private FormModal = FormModal;

  /** Filter by field.visible & label */
  tableFields: {}[] = this.fields.filter((field) => {
    return (field.label !== undefined && (field.visible??true))
  });

  /** Used in Members */
  @Prop() rowClass: ((response: any) => string) | undefined;

  /** Used in Academic Bodies */
  @Prop() links!: Object;

  /** Bound to Apollo */
  items: any = [];
  /** Diff */

  /** Table Presenter Stuff */
  /** TODO: Check */
  criteria: string[] = [];
  sortBy = '';
  sortDesc = false;
  sortDirection = 'asc';
  options: any[] = [];

  /** Charts */
  isVisibleChart = false;

  //[x: string]: any; //bruh

  /** Methods */
  beforeMount() {
    /** Initialize Filters */
    this._selectedFilters = [];

    /** Get Route Params to filter by scope */
    this._routeArgs = Object.keys(this.$route.params).map((key: string) =>{
      return {
        name: key,
        value: this.$route.params[key]
      }
    });

    /** Get keys from fields */
    this._fields = this.fields.map((field: any) => field.key);

    /** Add ID */
    this._fields.push("id");

    /** Initialize Items Query */
    this.$apollo.addSmartQuery("items", {
      query: this._updateItemsQuery,
      update: data => data[this.resource.resource.plural].data
    });

    /** Pause Query, wait for search component */
    this.$apollo.queries.items.skip = true;
  }

  mounted() {
    /** Search component should be mounted by now */
    /** filterItems() should run once to update default query filters */

    /** Unpause Query */
    this.$apollo.queries.items.skip = false;

    this.runQueryParams();

    /** Push options for context menu */
    this.options = this.generateOptions();
  }

  /** Redirect Query Params */
  private runQueryParams() {
    if (Object.keys(this.$route.query).includes("create")) {
      //@ts-ignore
      this.showModal(FormModal.Type.Create);
    }
  }

  /** Charts */
  get chartIcon() {
      return this.isVisibleChart ? ['fas', 'chevron-up'] : ['fas', 'chevron-down'];
  }

  private toggleChart() {
      this.isVisibleChart = !this.isVisibleChart;
  }

  /** Apollo Queries */
  private _updateItemsQuery() {
    return this.resource.all({
      fields: this._fields,
      args: this._selectedFilters.concat(this._routeArgs),
      vars: []
    });
  }

  /** Search */
  public filterItems(filters: {criteria:any[], terms:any[]}) {
    let args = [filters.terms];
    filters.criteria.map(criteria => args.push(criteria));

    /** Update Filters in Repository */
    this._selectedFilters = args;

    /** Refresh Query */
    this.$apollo.queries.items.refresh();
    /**
     * Apparently Apollo calls the query twice:
     * https://github.com/vuejs/vue-apollo/discussions/492
     * This is intended behaviour for cache or something idk
     */
  }

  /** Table */
  onRowClick(item: any, index: number, button: any) {
    if (this.formSchemas.hasOwnProperty("edit")) {
      //@ts-ignore
      this._showAndFetch(FormModal.Type.Update, item.id);
    } else if (this.formSchemas.hasOwnProperty("detail")) {
      //@ts-ignore
      this._showAndFetch(FormModal.Type.Read, item.id);
    } else {
      //@ts-ignore
      this.$router.push(this.links.edit.link.replace("*", item.id));
    }
  }

  /** Todo: */
  search(row: any, criteria: string[]) {
    const values: string[] = Object.values(row);
    const valueString = values.toString();
    return criteria.filter(value => {
      return valueString.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }).length > 0;
  }

  /** Listeners */
  onMutateSuccess(item: any, type: string) {
    if (type === "create") {
      this.$emit("created-element", item);
    }
    /** Refresh Table */
    this.$apollo.queries.items.refetch();
  }

  /** Modals */
  /** Used for Create */
  showModal(type: string) {
    this.$root.$emit('bv::show::modal', type);
  }

  /** Used for Edit & Details */
  private _showAndFetch(type: string, itemId: string) {
    this.showModal(type);
    //@ts-ignore
    this.$refs[type].fetch(itemId);
  }

  /** WIP */
  updateCache(item: any) {
    /** Not done yet lol */
    return;
    //@ts-ignore
    let query = this.$apollo.queries.items.options.query;
    let cache = this.$apollo.getClient().cache;

    const data = cache.readQuery({ query: query });
    //@ts-ignore
    data.items.push(item);
    cache.writeQuery({ query: query, data })
  }

  /** Options Generator */
  /** Where to Generate? */
  private generateOptions() {
    let options = [];

    /** TODO: Use Enum */
    /** Foreach? */
    if (this.formSchemas.hasOwnProperty("detail")) {
      // options.push({
      //   click: "detail",
      //   name: this.generateOptionsText("info-circle", `Detalles de ${this.formSchemas.detail.legend}`)
      // })
      options.push({
        //@ts-ignore
        click: FormModal.Type.Read,
        //@ts-ignore
        name: this.generateOptionsText("info-circle", this.readForm.title)
      });
      /** Use FormModal.title? */
    }
    if (this.formSchemas.hasOwnProperty("edit")) {
    }
    if (this.formSchemas.hasOwnProperty("archive")) {
    }
    if (this.formSchemas.hasOwnProperty("delete")) {
    }



    return options;
  }

  private generateOptionsText(icon: string, text: string) {
    /** TODO: Think harder lmao */
    return `<a>
                  <i class="fas fa-${icon}"></i>
                   ${text}
           </a>`;
  }

  /** Context Menu Option Handler */
  optionClicked(event: any) {
    /** TODO: push into router as ?parameter=id */
    console.log(event);
  }
}
