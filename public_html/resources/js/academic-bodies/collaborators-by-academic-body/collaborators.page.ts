import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class CollaboratorsPage extends Vue {
    apiResource = GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'collaborators');
    spanishResourceName = 'Colaboradores'
    toolbar = new Set(['archive', 'add', 'edit']);
    fields = [
        {key: 'name', label: 'Nombre', sortable: true},
    ];
    schema = {
        fields: [
            {
                type: 'graphql-select-id',
                label: 'Colaborador',
                model: "employees_id",
                query: new GraphqlResourceRepository(`employees(free: ${this.$route.params.id}, filter: $filter)`),
                textKey: 'name'
            }
        ]
    };
}
