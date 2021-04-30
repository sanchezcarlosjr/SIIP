import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class NetworksPage extends Vue {
    apiResource = new GraphqlResourceRepository('networks(orderBy: {field: CREATED_AT, order: DESC}, filter: $filter)');
    spanishResourceName = 'red'
    toolbar = new Set<String>([]);
    fields = [
        {key: 'academic_body.name', label: 'Cuerpo Académico', sortable: true},
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'class', label: 'Clase', sortable: true},
        {key: 'type', label: 'Tipo', sortable: true},
        {key: 'range', label: 'Alcance', sortable: true},
        {key: 'finish_date', label: 'Fecha de fin', sortable: true},
        {key: 'academic_body.leader.name', label: 'Líder', sortable: true}
    ];
    defaultCriteria = [
      {
        type: "or",
        criteria: [
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
