import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class CollaboratorsPage extends Vue {
    apiResource = GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'collaborators');
    spanishResourceName = 'Colaboradores'
    toolbar = new Set(['archive', 'add', 'details']);
    fields = [
        {key: 'name', label: 'Nombre', sortable: true, class: 'w-40'},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'academic_unit.campus', label: 'Campus', sortable: true}
    ];
    schema = {
        fieldsToFind: [
            {
                type: 'label',
                label: 'Nombre',
                model: 'name'
            },
            {
                type: 'label',
                label: 'Correo electrónico',
                model: 'correo1'
            },
            {
                type: 'label',
                label: 'Edad',
                model: 'age'
            },
            {
                type: 'label',
                label: 'Unidad Académica',
                model: 'academic_unit.name'
            },
            {
                type: 'label',
                label: 'Sexo',
                model: 'sexo'
            },
            {
                type: 'label',
                label: 'Grado',
                model: 'grado'
            },
            {
                type: 'label',
                label: '¿Es PTC?',
                model: 'is_ptc',
                get: (employee: { is_ptc: boolean }) => (employee && employee.is_ptc) ? "Sí" : "No"
            },
            {
                type: "label",
                label: "¿Es un perfil PRODEP activo?",
                model: "has_active_prodep_profile",
                get: (employee: { has_active_prodep_profile: boolean }) => (employee && employee.has_active_prodep_profile) ? "Sí" : "No"
            },
            {
                type: 'label',
                label: '¿Es un SNI activo?',
                model: 'has_active_sni',
                get: (employee: { has_active_sni: boolean }) => (employee && employee.has_active_sni) ? "Sí" : "No"
            },
            {
                type: 'label',
                label: '¿Es un profesor-investigador?',
                model: 'is_researcher',
                get: (employee: { is_researcher: boolean }) => (employee && employee.is_researcher) ? "Sí" : "No"
            }
        ],
        fields: [
            {
                type: 'graphql-select-id',
                label: 'Colaborador',
                model: "employees_id",
                query: new GraphqlResourceRepository(`employees(filter: $filter)`),
                textKey: 'name'
            }
        ]
    };
}
