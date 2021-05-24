import { Component, Ref } from 'vue-property-decorator';
import ApolloForm from "../../@shared/application/apollo-form/apollo-form";
import AcademicBodyManagementPage from "../academic-body-management/academic-body-management.page";

import { academic_bodies } from "../../@shared/repositories/academic_bodies/repository.ts";

@Component
export default class AcademicBodyPage extends AcademicBodyManagementPage {
  @Ref() form!: Vue & {
    submit: ({})=>boolean;
    reset: ()=>void;
    get: (id: number)=>void;
    validate: ()=>boolean;
    busy: boolean;
  }
  public busy: boolean = false;

  mounted() {
    this.form.get(Number(this.$route.params.academic_body_id));

    this.$watch('form.busy', () => {
      this.busy = this.form.busy;
    }, {deep: true});
  }

  save() {
    this.form.submit({
      addRouteParams: false
    });
  }
}
