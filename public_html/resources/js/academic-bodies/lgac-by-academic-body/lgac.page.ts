import { Component, Vue } from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';
import { lgac } from "../../@shared/repositories/academic_bodies/lgac/repository.ts";

let schema = {
  legend: "LGAC",
  fields: [
    {
      type: 'input',
      inputType: 'text',
      label: 'Nombre de la LGAC*',
      model: 'name',
      required: true,
      validator: VueFormGenerator.validators.string.locale({
        fieldIsRequired: "Este campo es obligatorio"
      })
    },
    {
      type: 'input',
      inputType: 'text',
      label: 'Descripción',
      model: 'description'
    }
  ]
};

@Component
export default class LGACPage extends Vue {
  resource = lgac;
  criteria = [];
  fields = [
    {key: 'name', label: 'Nombre', sortable: true},
    {key: 'description', label: 'Descripción', sortable: true}
  ];
  schema = schema;
  formSchemas = {
    create: schema,
    edit: schema
  }
}
