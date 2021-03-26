import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class ProdepPage extends Vue {
    apiResource = GraphqlResourceRepository.createDefaultRepository('prodep_profiles');
    toolbar = new Set(['add', 'edit']);
    defaultCriteria = [
        {
            value: 'Mexicali',
            default: false
        },
        {
            value: 'Ensenada',
            default: false
        },
        {
            value: 'Tijuana',
            default: false
        }
    ];
    schema = {
        fields: [
            {
                type: 'calendar',
                label: 'Fecha de inicio',
                model: 'start_date'
            },
            {
                type: 'input',
                inputType: 'number',
                label: 'Años de vigencia',
                min: 3,
                max: 6,
                model: 'years_to_finish'
            },
            {
                type: 'graphql-select',
                label: 'Empleado',
                model: "employee_id",
                query: 'employees',
                textKey: 'name'
            },
            {
                type: 'graphql-select',
                label: 'Área del conocimiento',
                model: "prodep_area_id",
                query: 'prodep_areas',
                textKey: 'name'
            }
        ]
    };
    fields = [
        {key: 'employee.name', label: 'Nombre', sortable: true},
        {key: 'employee.id', label: 'No. Empleado', sortable: true},
        {key: `employee.academic_unit.name`, label: 'Unidad Académica', sortable: true},
        {key: 'start_date', label: 'Fecha inicio', sortable: true},
        {key: 'finish_date', label: 'Fecha fin', sortable: true},
        {key: 'prodep_area.name', label: 'Área de conocimiento', sortable: true},
    ];
}
