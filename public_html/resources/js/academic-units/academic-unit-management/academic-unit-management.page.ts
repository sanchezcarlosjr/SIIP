import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AcademicUnitManagementPage extends Vue {
    tableTitle = 'Gestión de cuerpos académicos';
    spanishResourceName = 'cuerpo académico';
    apiResource = 'academic-units';
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre del cuerpo académico',
                model: 'academic_unit_name'
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Clave PRODEP',
                model: 'prodep_key'
            },
            {
                type: 'calendar',
                label: 'Fecha de registro',
                model: 'register_date'
            },
            {
                type: "switch2",
                label: "Vigencia",
                model: "status",
                textOn: "Vigente",
                textOff: "No vigente"
            },
            {
                type: 'api-select',
                label: 'Nombre del lider',
                model: "leader_name",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'name'
            },
            {
                type: 'api-select',
                label: 'Areas PRODEP',
                model: "prodep",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'name'
            },
            {
                type: 'api-select',
                label: 'Displinas',
                model: "displines",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'name'
            },
            {
                type: 'api-select',
                label: 'DES',
                model: "des",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'name'
            }
        ]
    };
    fields = [
        { key: 'academic_unit_name', label: 'Nombre', sortable: true },
        { key: 'promep_key', label: 'Clave PROMEP', sortable: true },
        { key: 'degree_of_consolidation', label: 'Grado', sortable: true },
        { key: 'leader_name', label: 'Encargado', sortable: true },
        { key: 'actions', label: 'Acciones' }
    ];
}

