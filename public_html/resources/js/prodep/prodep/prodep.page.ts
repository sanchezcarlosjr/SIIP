import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ProdepPage extends Vue {
    tableTitle = 'Gestión de perfiles PRODEP';
    apiResource = 'prodep_profiles';
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
                type: 'input',
                inputType: 'text',
                label: 'Nombre del cuerpo académico',
                model: 'name'
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Clave PRODEP',
                model: 'prodep_key'
            },
            {
                type: "switch2",
                label: "Vigencia",
                model: "active",
                textOn: "Vigente",
                textOff: "No vigente"
            },
            {
                type: 'graphql-select',
                label: 'Líder de cuerpo académico',
                model: "lead_employee_id",
                query: 'employees',
                textKey: 'name'
            },
            {
                type: 'graphql-select',
                label: 'Área UABC',
                model: "uabc_areas_id",
                query: 'uabc_areas',
                textKey: 'area'
            },
            {
                type: 'graphql-select',
                label: 'Área PRODEP',
                model: "prodep_area_id",
                query: 'prodep_areas',
                textKey: 'name'
            },
            {
                type: 'graphql-select',
                label: 'Disciplina',
                model: "discipline_id",
                query: 'disciplines',
                textKey: 'name'
            },
            {
                type: 'graphql-select',
                label: 'DES',
                model: "des_id",
                query: 'des',
                textKey: 'des'
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
        { key: 'actions', label: 'Acciones' }
    ];
}
