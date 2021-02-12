import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class ProdepPage extends Vue {
    tableTitle = 'Gestión de perfiles PRODEP';
    private date = new Date();
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
                type: 'calendar',
                label: 'Fecha fin',
                model: 'finish_date'
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
                label: 'PRODEP AREAS',
                model: "prodep_area_id",
                query: 'prodep_areas',
                textKey: 'name'
            }
        ]
    };
    fields = [
        { key: `employee.academic_unit.name`, label: 'Unidad Académica', sortable: true },
        { key: 'employee.name', label: 'Líder', sortable: true },
        { key: 'employee.grado', label: 'Grado', sortable: true },
        { key: 'employee.age', label: 'Edad', sortable: true },
        { key: 'employee.sexo', label: 'Género', sortable: true },
        { key: 'prodep_area.name', label: 'Área de conocimiento', sortable: true },
        { key: 'start_date', label: 'Fecha de inicio', sortable: true },
        { key: 'finish_date', label: 'Fecha fin', sortable: true },
    ];
}
