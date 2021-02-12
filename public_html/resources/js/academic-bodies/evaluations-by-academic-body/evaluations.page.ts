import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-finder-repository";

@Component
export default class EvaluationsPage extends Vue {
    tableTitle = `Evaluaciones de *`;
    apiResource = new GraphqlResourceFinderRepository('academic_body', 'evaluations', 'updateEvaluation', 'createEvaluation', 'updateEvaluationInput', 'createEvaluationInput', {index: ''});
    spanishResourceName = 'Evaluación'
    toolbar = new Set(['add', 'edit']);
    fields = [
        {key: 'grade', label: 'Grado', sortable: true},
        {key: 'start_date', label: 'Primera evaluación', sortable: true},
        {key: 'finish_date', label: 'Vigencia hasta', sortable: true}
    ];
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Grado',
                model: 'grade'
            },
            {
                type: 'calendar',
                inputType: 'text',
                label: 'Fecha final',
                model: 'finish_date'
            },
            {
                type: 'calendar',
                inputType: 'text',
                label: 'Fecha inicial',
                model: 'start_date'
            }
        ]
    };
}

