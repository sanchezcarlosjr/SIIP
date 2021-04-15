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
        {key: 'name', label: 'Nombre', sortable: true, class: 'vw-20'},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'academic_unit.campus', label: 'Campus', sortable: true},
    ];
    schema = {
        fieldsToFind: [
            {
                type: 'label',
                label: 'Nombre',
                model: 'name'
            }
        ],
        fields: [
            {
                type: 'graphql-select-id',
                label: 'Colaborador',
                model: "employees_id",
                query: new GraphqlResourceRepository(`employees(filter: $filter)`),
                textKey: 'name'
            }
        ]
    };
}
