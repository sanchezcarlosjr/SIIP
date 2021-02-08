import Vue from "vue"
import Component from "vue-class-component"
import {GraphQLBuilder} from "../../@shared/infraestructure/communication/GraphQL";

@Component
export default class MembersPage extends Vue {
    tableTitle = `Miembros de *academic_unit.name`;
    apiResource = `academic_body(id: ${this.$route.params.id})`;
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
        {key: 'employees.name', label: 'Nombre', sortable: true},
        {key: 'employees.academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'employees.grado', label: 'Grado', sortable: true}
    ];
    schema = {
        fields: [
            {
                type: 'graphql-select',
                label: 'Empleado',
                model: "employees_id",
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
