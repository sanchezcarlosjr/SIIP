import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AcademicBodyManagementPage extends Vue {
    tableTitle = 'Gestión de cuerpos académicos';
    apiResource = 'academic_bodies';
    toolbar = new Set(['add', 'edit', 'archive']);
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
    links =  {
        'address-book': {
            'link': '/cuerpos-academicos/*/lgacs',
            'tooltip': 'Ver sus LGAC'
        },
        'user-tie': {
            link: '/cuerpos-academicos/*/miembros',
            tooltip: 'Ver sus miembros'
        },
        'vial': {
            link: '/cuerpos-academicos/*/evaluaciones',
            tooltip: 'Ver sus evaluaciones'
        },
        'hands-helping': {
            link: '/cuerpos-academicos/*/apoyos',
            tooltip: 'Ver sus apoyos'
        },
        'network-wired': {
            link: '/cuerpos-academicos/*/redes',
            tooltip: 'Ver sus redes'
        }
    };
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
        { key: 'name', label: 'Nombre', sortable: true },
        { key: 'prodep_key', label: 'Clave PRODEP', sortable: true },
        { key: 'last_evaluation.grade', label: 'Grado', sortable: true },
        { key: 'leader.nombre', label: 'Líder', sortable: true },
        { key: `leader.academic_unit.name`, label: 'Unidad Académica', sortable: true },
        { key: 'actions', label: 'Acciones' }
    ];
}
