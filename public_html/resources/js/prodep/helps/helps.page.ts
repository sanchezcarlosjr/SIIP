import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";
import VueFormGenerator from 'vue-form-generator';

@Component
export default class HelpsPage extends Vue {
    apiResource = GraphqlResourceRepository.createDefaultRepository('prodep_helps');
    spanishResourceName = 'beneficio';
    toolbar = new Set(["add"]);
    schema = {
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
                type: 'select',
                label: 'Tipo de beneficio*',
                model: 'type',
                values: [
                  {
                    name: "Apoyo inicial",
                    id: "0"
                  },
                  {
                    name: "Apoyo complementario",
                    id: "1"
                  },
                  {
                    name: "Apoyo 6 años",
                    id: "2"
                  },
                  {
                    name: "Estancias cortas",
                    id: "3"
                  },
                  {
                    name: "Apoyo publicación",
                    id: "4"
                  }/*,
                  {
                    name: "Convocatoria redes",
                    id: "5"
                  },
                  {
                    name: "Convocatoria fortalecimiento",
                    id: "6"
                  },
                  {
                    name: "Beca postdoctorado",
                    id: "7"
                  }*/
                ],
                validator: (value: string)=>{
                  let errors = [];
                  if (!value) {
                    errors.push("Selecciona una opción");
                  }
                  if (parseInt(value) > 7 || parseInt(value) < 0) {
                    errors.push("Opción desconocida");
                  }
                  return errors;
                }
            },
            {
                type: 'input',
                inputType: 'number',
                label: 'Cantidad de apoyo',
                model: 'amount',
                required: true,
                validator: VueFormGenerator.validators.number
            },
            {
                type: 'calendar',
                label: 'Fecha de apoyo',
                model: 'date',
                required: true,
                validator: VueFormGenerator.validators.date
            }
        ]
    };
    fields = [
        {key: "employee.name", label: "Beneficiario", sortable: true},
        {key: "type", label: "Tipo", sortable: true},
        {key: "amount", label: "Cantidad", sortable: true},
        {key: "date", label: "Fecha", sortable: true},
        {key: `employee.academic_unit.name`, label: 'Unidad Académica', sortable: true},
    ];
}
