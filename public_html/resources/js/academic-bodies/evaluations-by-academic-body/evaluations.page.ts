import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";

@Component
export default class EvaluationsPage extends Vue {
    tableTitle = `Evaluaciones de *`;
    apiResource = new GraphqlSubResourceFinderRepository('academic_body', 'evaluations', 'updateEvaluation', 'createEvaluation', 'updateEvaluationInput', 'createEvaluationInput', {index: ''});
    spanishResourceName = 'Evaluación'
    toolbar = new Set(['add', 'edit']);
    fields = [
        {key: 'grade', label: 'Grado', sortable: true},
        {key: 'start_date', label: 'Vigente desde', sortable: true, class: 'vw-5'},
        {key: 'finish_date', label: 'Vigencia hasta', sortable: true, class: 'vw-5'}
    ];
    schema = {
        fields: [
            {
                type: 'select',
                label: 'Grado',
                model: 'grade',
                values: [
                    'Formación',
                    'Consolidación',
                    'Consolidado',
                ]
            },
            {
                type: 'calendar',
                inputType: 'text',
                label: 'Vigente desde',
                model: 'start_date'
            },
            {
                type: 'input',
                inputType: 'number',
                label: 'Años de vigencia',
                model: 'years_to_finish'
            },
        ]
    };
}

