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
                label: 'Clave PROMEP',
                model: 'promep_key'
            },
            {
                type: 'calendar',
                label: 'Fecha de registro',
                model: 'register_date'
            },
            {
                type: "switch2",
                label: "Vigencia",
                model: "active",
                textOn: "Vigente",
                textOff: "No vigente"
            },
            {
                type: 'api-select',
                label: 'UABC Area',
                model: "uabc_area_id",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'username'
            },
            {
                type: 'api-select',
                label: 'Nombre del líder',
                model: "leader_id",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'email'
            },
            {
                type: 'api-select',
                label: 'Área  PRODEP',
                model: "prodep_area_id",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'address.city'
            },
            {
                type: 'api-select',
                label: 'Disciplina',
                model: "displine_id",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'name'
            },
            {
                type: 'api-select',
                label: 'DES',
                model: "des_id",
                api: 'https://jsonplaceholder.typicode.com/users',
                textKey: 'name'
            }
        ]
    };
    fields = [
        { key: 'academic_unit_name', label: 'Nombre', sortable: true },
        { key: 'promep_key', label: 'Clave PROMEP', sortable: true },
        { key: 'degree_of_consolidation', label: 'Grado', sortable: true },
        { key: 'leader_id', label: 'Encargado', sortable: true },
        { key: 'actions', label: 'Acciones' }
    ];
}

