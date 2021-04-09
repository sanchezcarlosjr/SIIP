import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class HelpsPage extends Vue {
    apiResource = new GraphqlResourceRepository('helps(orderBy: {field: CREATED_AT, order: DESC}, filter: $filter)');
    toolbar = new Set<String>([]);
    fields = [
        {key: 'type', label: 'Tipo', sortable: true},
        {key: 'date', label: 'Fecha', sortable: true},
        {key: 'amount', label: 'Cantidad', sortable: true},
        {key: 'benefited_employee.name', label: 'Beneficiario', sortable: true},
        {key: 'academic_body.name', label: 'Cuerpos académicos', sortable: true},
        {key: 'academic_body.leader.academic_unit.name', label: 'Unidad académica', sortable: true},
        {key: 'academic_body.leader.academic_unit.campus', label: 'Campus', sortable: true},
    ];
}
