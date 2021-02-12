import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class EvaluationsPage extends Vue {
    apiResource = new GraphqlResourceRepository(
        'academic_bodies',
        '',
        '',
        '',
        '',
        {
            index: 'active name'
        });
    toolbar = new Set<String>([]);
    fields = [
        {key: 'name', label: 'Cuerpo académico', sortable: true},
        {key: 'leader.academic_unit.name', label: 'Unidad académica', sortable: true},
        {key: 'last_evaluation.grade', label: 'Grado', sortable: true},
        {key: 'last_evaluation.finish_date', label: 'Última evaluación', sortable: true},
    ];
    defaultCriteria = [{
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
        }
        ];
}
