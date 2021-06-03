import Vue from "vue";
import Component from "vue-class-component";
import GraphQLResourceRepository from "../../@shared/infraestructure/communication/graphql/test";
import {employees} from "../../@shared/repositories/employees/repository";
import {validator as GraphQLSelectIdValidator} from "../../@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id";
import {sni_areas} from "../../@shared/repositories/sni/repository";

@Component
export default class SniPage extends Vue {
    private currentYear = new Date().getFullYear();
    private schema = {
        legend: "SNI",
        fields: [
            {
                type: 'graphql-select-id',
                label: 'Nombre del empleado beneficiado*',
                model: "employee.name",
                query: {
                    resource: employees,
                    target: "name",
                    ref: "employee_id",
                    scopes: [
                        {
                            name: "name_or_id"
                        }
                    ]
                },
                required: true,
                hint: "Número de Empleado: ",
                validator: GraphQLSelectIdValidator({
                    selectValid: "Seleccione un empleado válido"
                })
            },
            {
                type: 'calendar',
                label: 'Fecha de inicio',
                model: "start_date",
                value: `${this.currentYear}-01-01`,
            },
            {
                type: 'calendar',
                label: 'Fecha de fin',
                model: "finish_date",
                value: `${this.currentYear}-12-31`,
            },
            {
                type: 'select',
                label: 'Nivel',
                model: 'level',
                values: ["Candidato", "Nivel 1", "Nivel 2", "Nivel 3", "Emérito"]
            },
            {
                type: 'graphql-select-id',
                label: 'Área SNI*',
                model: "sni_area.name",
                query: {
                    resource: sni_areas,
                    target: "name",
                    ref: "sni_area_id",
                    scopes: [{
                        name: "name_like"
                    }]
                },
                required: true,
                validator: GraphQLSelectIdValidator({
                    selectValid: "Seleccione un área válida"
                })
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Disciplina',
                model: "discipline"
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Campo',
                model: "field"
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Especialidad',
                model: "specialty"
            }
        ]
    };
    resource = new GraphQLResourceRepository(
        {
            singular: "sni",
            plural: "snis"
        }
    );
    fields = [
        {key: "employee.name", label: "Investigador", sortable: true, editable: true},
        {key: "employee.academic_unit.name", label: "Unidad académica", sortable: true, editable: true},
        {key: "level", label: "Nivel", sortable: true, editable: true},
        {key: "start_date", label: "Fecha de inicio", sortable: true, editable: true},
        {key: "finish_date", label: "Fecha fin", sortable: true, editable: true},
        {key: "sni_area.name", label: "Área SNI", sortable: true, editable: true}
    ];
    formSchemas = {
        create: this.schema,
        edit: this.schema
    }
}
