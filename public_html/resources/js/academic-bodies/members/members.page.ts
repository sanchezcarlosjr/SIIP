import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class MembersPage extends Vue {
    apiResource = new GraphqlResourceRepository('employees(members:true)');
    spanishResourceName = 'miembro'
    toolbar = new Set<String>([]);
    fields = [
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'academic_body.name', label: 'Cuerpos Académicos', sortable: true},
        {key: 'grado', label: 'Grado', sortable: true}
    ];
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
