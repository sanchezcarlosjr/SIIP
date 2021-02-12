import Vue from "vue"
import Component from "vue-class-component"
import {GraphQLBuilder} from "../../@shared/infraestructure/communication/GraphQL";
import {MembersRepository} from "./members.repository";

@Component
export default class MembersPage extends Vue {
    tableTitle = `Miembros de *`;
    apiResource = new MembersRepository('academic_body', 'employees');
    spanishResourceName = 'miembro'
    toolbar = new Set<string>(['removeRelation', 'add']);
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
        {key: 'academic_unit.campus', label: 'Campus', sortable: true},
        {key: 'correo1', label: 'Correo', sortable: true},
        {key: 'grado', label: 'Grado', sortable: true}
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
