import Vue from "vue"
import Component from "vue-class-component"
import {MembersRepository} from "./members.repository";
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class MembersPage extends Vue {
    apiResource = new MembersRepository('academic_body', 'employees');
    spanishResourceName = 'miembro'
    toolbar = new Set<string>(['add', 'remove', 'details']);
    fields = [
        {key: 'is_leader', sortable: true},
        {key: 'name', label: 'Nombre', sortable: true, class: 'w-40'},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'academic_unit.campus', label: 'Campus', sortable: true},
    ];
    rowClass = (employee: { is_leader: boolean }) => {
        return employee?.is_leader ? 'text-success' : '';
    };
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
                label: 'Empleado',
                model: "employees_id",
                query: new GraphqlResourceRepository(`employees(free: ${this.$route.params.id}, filter: $filter)`),
                textKey: 'name'
            },
            {
                type: 'graphql-select',
                label: 'LGAC',
                model: 'lgac_id',
                query: GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'lgacs'),
                textKey: 'name'
            },
            {
                type: "switch2",
                label: "Liderazgo",
                model: "is_leader",
                textOn: "Es el líder del cuerpo académico",
                textOff: "No es el líder del cuerpo académico"
            },
        ]
    };
    defaultCriteria = [
      {
        type: "or",
        criteria: [
          {
            value: 'Próximos a jubilarse'
          },
          {
            value: 'Líderes',
          }
        ]
      },
      {
        type: "xor",
        criteria: [
          {
              value: 'Mexicali'
          },
          {
              value: 'Ensenada'
          },
          {
              value: 'Tijuana'
          }
        ]
      }
    ];
}
