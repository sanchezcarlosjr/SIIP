import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";

@Component
export default class NetworksPage extends Vue {
    tableTitle = `Redes de *`;
    apiResource = GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'networks');
    spanishResourceName = 'red'
    toolbar = new Set<String>(['add', 'edit']);
    fields = [
        {key: 'name', label: 'Nombre del grupo de investigación', sortable: true},
        {key: 'class', label: 'Clase', sortable: true},
        {key: 'type', label: 'Tipo', sortable: true},
        {key: 'range', label: 'Alcance', sortable: true},
        {key: 'start_date', label: 'Fecha de inicio', sortable: true},
        {key: 'finish_date', label: 'Fecha de fin', sortable: true},
        {key: 'academic_body.leader.name', label: 'Líder', sortable: true}
    ];
    defaultCriteria = [
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
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre del grupo de investigación',
                model: 'name'
            },
            {
                type: 'select',
                label: 'Clase',
                model: 'class',
                values: ['CA', 'Red', 'Institución']
            },
            {
                type: 'select',
                label: 'Tipo',
                model: 'type',
                values: ['Interno', 'Externo']
            },
            {
                type: 'select',
                label: 'Alcance',
                model: 'range',
                values: ['Regional', 'Nacional', 'Internacional']
            },
            {
                type: 'calendar',
                label: 'Fecha de inicio',
                model: 'start_date'
            },
            {
                type: 'calendar',
                label: 'Fecha de fin',
                model: 'finish_date'
            },
        ]
    };
}
