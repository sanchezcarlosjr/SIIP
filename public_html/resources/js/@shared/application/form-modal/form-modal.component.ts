import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import ApolloForm from "../../@shared/application/apollo-form/apollo-form.component.vue";

enum FormType {
  Create = "create",
  Read = "detail",
  Update = "edit",
  Delete = "delete",
  Archive = "archive"
}

@Component
export default class FormModal extends Vue {
  @Prop({ default: FormType.Read }) type?: FormType;
  @Prop({ default: "md" }) size?: string;
  @Prop() schema!: any; /** Todo lol */
  @Prop() resource: any;
  @Ref() form!: Vue & {
    submit: ()=>boolean;
    reset: ()=>void;
    get: (id: number)=>void;
    validate: ()=>boolean;
    busy: boolean;
  }
  @Ref() modal!: any;
  busy: boolean = false;

  private get _okTitle(): string {
    switch(this.type) {
      case FormType.Create: return `Añadir`;
      case FormType.Update: return `Guardar`;
      case FormType.Delete: return `Eliminar`;
      case FormType.Archive: return `Archivar`;
      case FormType.Read:
      default: return ``;
    }
  }

  private get _id(): string {
    return this.type || ``;
  }

  private get _title(): string {
    switch(this.type) {
      case FormType.Create: return `Crear ${this.schema.legend}`;
      case FormType.Read: return `Detalles de ${this.schema.legend}`;
      case FormType.Update: return `Editar ${this.schema.legend}`;
      case FormType.Delete: return `Eliminar ${this.schema.legend}`;
      case FormType.Archive: return `Archivar ${this.schema.legend}`;
      default: return ``;
    }
  }

  public get title(): string {
    return this._title;
  }

  private beforeMount():void {
    this.size = this.schema.size || this.size;
  }

  private isTypeRead(): boolean {
    return this.type === FormType.Read;
  }

  private onHide(e: any) {
    if (e.trigger !== "ok") {
      this.form.reset();
    }
  }

  private async onOk(e: any) {
    e.preventDefault();
    if (await this.form.validate()) {
      let item = await this.form.submit();
      if (item !== undefined) {
        this.$emit("mutate-success", item, this.type);
        this.modal.hide();
        this.reset();
      }
    }
  }

  reset() {
    this.form.reset()
  }

  ok(e: any) {
    this.form.submit();
  }

  mounted() {
    this.$watch('form.busy', () => {
      this.busy = this.form.busy;
    }, {deep: true});
  }

  fetch(id: number) {
    /** Modal requires to be static in order for this to work */
    /** Otherwise, object is not mounted at call time */
    this.form.get(id);
  }

  public static Type = FormType;
}
