import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";
import {default as GraphQLResourceRepository, key2field, QueryParams} from "../../@shared/infraestructure/communication/graphql/test";
import VueFormGenerator from 'vue-form-generator';

let schema = {
  legend: "Apoyo a NPTC",
    fields: [
        {
            type: 'graphql-select-id',
            label: 'Nombre del empleado beneficiado*',
            model: "employee_id",
            query: new GraphqlResourceRepository(`employees(filter: $filter)`),
            textKey: 'name',
            validator: function (value: any, schema: any) {
              let errors = [];
              /** (undefined|true) == falsy */
              if (schema.datalist?.some((o: any)=>o.value === value) == false) {
                errors.push("Seleccione un empleado valido");
              }
              return errors;
            }
        },
        {
            type: 'checklist',
            label: 'Tipo de beneficio*',
            model: 'type',
            listBox: true,
            values: [
                'Beca',
                "Proyecto de Investigación",
                "Gasto básico",
                "Otros"
            ],
            required: true
        },
        {
            type: 'calendar',
            label: 'Fecha de apoyo*',
            model: 'date',
            required: true,
            validator: VueFormGenerator.validators.date.locale({
              fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
          type: "switch2",
          label: "Con prorroga?",
          model: "prorroga"
        }
    ]
};


@Component
export default class NptcsPage extends Vue {
  testResource = new GraphQLResourceRepository(
    {
      singular: "prodep_nptc",
      plural: "prodep_nptcs"
    }
  );
    tableTitle = "NPTC";
    apiResource = GraphqlResourceRepository.createDefaultRepository('prodep_nptcs');
    spanishResourceName = "NPTC";
    toolbar = new Set(["add"]);
    defaultCriteria = [];
    fields = [
      {key: "employee.name", label: "Beneficiario", sortable: true, class: "vw-20"},
      {key: "amount", label: "Monto", sortable: true},
      {key: "employee.academic_unit.name", label: "Unidad académica", sortable: true},
      {key: "type", label: "Tipo", sortable: true},
      {key: "date", label: "Fecha Inicio", sortable: true}
    ];
    schema = schema;
    formSchemas = {
      create: schema,
      edit: schema,
      //details: schema.fields.map((field: any)=>{field.type = "label"})
    }
}
