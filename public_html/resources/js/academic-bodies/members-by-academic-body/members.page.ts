import Vue from "vue"
import Component from "vue-class-component"
import {GraphQLBuilder} from "../../@shared/infraestructure/communication/GraphQL";
import {MembersRepository} from "./members.repository";
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class MembersPage extends Vue {
    apiResource = new MembersRepository('academic_body', 'employees');
    spanishResourceName = 'miembro'
    toolbar = new Set<string>(['add', 'remove', 'details']);
    infoVariant = (items: { employees: { id: string } }[]) => {
        const graphql = new GraphQLBuilder('academic_body', [{key: 'leader.id', sortable: true}]);
        return graphql.find(this.$route.params.id).then((response: any) => {
            let index = 0;
            items.forEach((value, i) => {
                if (value.employees.id === response.leader.id) {
                    return index = i;
                }
            });
            return index;
        });
    };
    fields = [
        {key: 'name', label: 'Nombre', sortable: true, class: 'vw-20'},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'academic_unit.campus', label: 'Campus', sortable: true},
    ];
    schema = {
        fieldsToFind: [
            {
                type: 'label',
                label: 'Nombre',
                model: 'name'
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
            value: 'Próximos a jubilarse',
            default: false
        },
        {
            value: 'Líderes',
            default: false
        },
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
        }];
}
