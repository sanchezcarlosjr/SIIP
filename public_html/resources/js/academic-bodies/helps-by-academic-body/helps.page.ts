import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-finder-repository";

@Component
export default class HelpsPage extends Vue {
    tableTitle = `Apoyos de *`;
    apiResource = GraphqlResourceFinderRepository.createDefaultFinder('academic_body', 'helps');
    spanishResourceName = 'apoyo'
    toolbar = new Set(['add', 'edit']);
    fields = [
        {key: 'type', label: 'Tipo', sortable: true},
        {key: 'date', label: 'Fecha', sortable: true},
        {key: 'amount', label: 'Cantidad', sortable: true},
        {key: 'benefited_employee.name', label: 'Beneficiario', sortable: true},
        {key: 'academic_body.leader.academic_unit.name', label: 'Unidad académica', sortable: true},
        {key: 'academic_body.leader.academic_unit.campus', label: 'Campus', sortable: true}
    ];
    schema = {
        fields: [
            {
                type: 'select',
                label: 'Tipo de apoyo',
                model: 'type',
                values: [
                    'Estancias cortas',
                    'Apoyo a publicación',
                    'Convocatoria redes',
                    'Convocatoria fortalecimiento de CA',
                    'Becas posdoctorado'
                ]
            },
            {
                type: 'calendar',
                label: 'Fecha',
                model: 'date'
            },
            {
                type: 'input',
                inputType: 'number',
                label: 'Monto',
                model: 'amount'
            },
            {
                type: 'graphql-select',
                label: 'Empleado beneficiado',
                model: "benefited_employee_id",
                query: 'employees',
                textKey: 'name'
            },
        ]
    };
}

