import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import ApolloForm from "../../../@shared/application/apollo-form/apollo-form.component.vue";

@Component
export default class EditModal extends Vue {
  @Prop() size: any;
  @Prop() schema: any;
  @Prop() title: any;
  @Prop() resource: any;
  @Prop() itemId: any;
  @Prop() isDetailsForm: any;
  @Ref() form!: Vue & {
    submit: ()=>void;
    reset: ()=>void;
    get: (id: number)=>void;
  }

  name = "edit-modal";

  reset() {
    this.form.reset()
  }

  ok(e: any) {
    this.form.submit();
  }

  mounted() {
    console.log(this);
  }

  fetch(id: number) {
    /** Modal requires to be static in order for this to work */
    /** Otherwise, object is not mounted at call time */
    this.form.get(id);
  }
}
