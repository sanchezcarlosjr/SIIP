import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-finder-repository";

@Component
export default class LGACPage extends Vue {
    tableTitle = `LGACS de *`;
    apiResource = new GraphqlResourceFinderRepository(
        'academic_body',
        'lgacs',
        {index: ''},
        'updateLgac',
        'createLgac',
        'updateLgacInput',
        'createLgacInput'
    );
    spanishResourceName = 'LGAC'
    toolbar = new Set(['archive', 'add', 'edit']);
    fields = [
        {key: 'key', label: 'Clave', sortable: true},
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
                label: 'Clave',
                model: 'key'
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

