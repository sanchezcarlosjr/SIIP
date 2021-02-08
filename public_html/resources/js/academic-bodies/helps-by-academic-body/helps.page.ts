import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class HelpsPage extends Vue {
    tableTitle = `Apoyos de *academic_unit.name`;
    apiResource = `academic_body(id: ${this.$route.params.id})`;
    spanishResourceName = 'apoyo'
    toolbar = new Set(['add', 'edit']);
    fields = [
        {key: 'helps.type', label: 'Tipo', sortable: true},
        {key: 'helps.date', label: 'Fecha', sortable: true},
        {key: 'helps.amount', label: 'Cantidad', sortable: true},
        {key: 'helps.benefited_employee.name', label: 'Beneficiario', sortable: true},
        {key: 'helps.academic_body.leader.academic_unit.name', label: 'Unidad académica', sortable: true},
        {key: 'helps.academic_body.leader.academic_unit.campus', label: 'Campus', sortable: true}
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

