import Vue from "vue"
import Component from "vue-class-component"
import {GraphQLBuilder} from "../../@shared/infraestructure/communication/GraphQL";
import {GraphqlResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-finder-repository";

@Component
export default class MembersPage extends Vue {
    tableTitle = `Miembros de *`;
    apiResource = GraphqlResourceFinderRepository.createDefaultFinder('academic_body', 'employees');
    spanishResourceName = 'miembro'
    toolbar = new Set<string>(['removeRelation', 'add-relation']);
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
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'grado', label: 'Grado', sortable: true}
    ];
    schema = {
        fields: [
            {
                type: 'graphql-select',
                label: 'Empleado',
                model: "lead_employee_id",
                query: 'employees',
                textKey: 'nombre'
            }
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
