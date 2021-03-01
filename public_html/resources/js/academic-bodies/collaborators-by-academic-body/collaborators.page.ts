import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";

@Component
export default class CollaboratorsPage extends Vue {
    apiResource = GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'collaborators');
    spanishResourceName = 'Colaboradores'
    toolbar = new Set(['archive', 'add', 'edit', 'remove']);
    fields = [
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'description', label: 'Descripción', sortable: true}
    ];
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre del Colaborador',
                model: 'name'
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Descripción',
                model: 'description'
            }
        ]
    };
}