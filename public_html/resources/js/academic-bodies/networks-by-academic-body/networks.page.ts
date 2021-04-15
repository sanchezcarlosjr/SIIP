import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";

@Component
export default class NetworksPage extends Vue {
    apiResource = GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'networks');
    spanishResourceName = 'red'
    toolbar = new Set<String>(['add', 'edit-xl']);
    fields = [
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'academic_body.leader.name', label: 'Líder', sortable: true},
        {key: 'range', label: 'Alcance', sortable: true},
        {key: 'start_date', label: 'Fecha de inicio', sortable: true},
        {key: 'finish_date', label: 'Fecha de fin', sortable: true},
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
        fieldsToFind: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre',
                model: 'name'
            },
            {
                type: 'select',
                label: 'Alcance',
                model: 'range',
                values: ['Local', 'Regional', 'Nacional', 'Internacional']
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
            {
                type: "link",
                label: "Formalización",
                model: "formation_url",
                visible: (model: any) => !!model?.formation_url
            },
            {
                type: "upload2",
                label: 'Nueva formalización',
                ignoreResponseField: true,
                model: 'formation'
            }
        ],
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre',
                model: 'name'
            },
            {
                type: 'select',
                label: 'Alcance',
                model: 'range',
                values: ['Local', 'Regional', 'Nacional', 'Internacional']
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
            {
                type: "upload2",
                label: 'Formalización',
                model: 'formation'
            }
        ]
    };
}
