import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";

@Component
export default class LGACPage extends Vue {
    apiResource = GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'lgacs');
    spanishResourceName = 'LGAC'
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
                label: 'Nombre del LGAC',
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

