import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class EvaluationsPage extends Vue {
    tableTitle = `Evaluaciones de *academic_unit.name`;
    apiResource = `academic_body(id: ${this.$route.params.id})`;
    spanishResourceName = 'Evaluación'
    toolbar = new Set(['add', 'edit']);
    fields = [
        {key: 'evaluations.grade', label: 'Grado', sortable: true},
        {key: 'evaluations.academic_body.leader.academic_unit.name', label: 'Unidad académica', sortable: true},
        {key: 'evaluations.finish_date', label: 'Última evaluación', sortable: true},
        {key: 'evaluations.start_date', label: 'Primera evaluación', sortable: true}
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

