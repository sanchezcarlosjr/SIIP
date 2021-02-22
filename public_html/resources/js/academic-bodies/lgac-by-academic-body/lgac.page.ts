import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-finder-repository";

@Component
export default class LGACPage extends Vue {
    apiResource = GraphqlResourceFinderRepository.createDefaultFinder('academic_body', 'lgacs');
    spanishResourceName = 'LGAC'
    toolbar = new Set(['archive', 'add', 'edit', 'remove']);
    fields = [
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'description', label: 'Descripción', sortable: true},
        {key: 'active', label: 'Vigente', sortable: true}
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
            },
            {
                type: "switch2",
                label: "Vigencia",
                model: "active",
                textOn: "Vigente",
                textOff: "No vigente"
            },
        ]
    };
    defaultCriteria = [
        {
            value: 'vigente',
            default: false
        },
        {
            value: 'no vigente',
            default: false
        }
    ];
}

