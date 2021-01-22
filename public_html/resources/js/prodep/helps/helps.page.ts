import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class HelpsPage extends Vue {
    tableTitle = "Beneficios PRODEP";
    apiResource = "prodep_helps";
    spanishResourceName = 'beneficio';
    toolbar = new Set(["add"]);
    schema = {
        fields: [
            {
                type: 'graphql-select',
                label: 'Nombre del empleado beneficiado',
                model: "employee_id",
                query: 'employees',
                textKey: 'name'
            },
            {
                type: 'select',
                label: 'Tipo de beneficio',
                model: 'type',
                values: [
                    'Apoyo inicial',
                    'Apoyo complementario',
                    'Apoyo 6 años',
                    'Estancias cortas',
                    'Apoyo publicación',
                    'Convocatoria redes',
                    'Convocatoria fortalecimiento',
                    'Beca postdoctorado'
                ]
            },
            {
                type: 'calendar',
                label: 'Fecha de apoyo',
                model: 'date'
            },
            {
                type: 'input',
                inputType: 'number',
                label: 'Cantidad de apoyo',
                model: 'amount'
            },
        ]
    };
    fields = [
        {key: 'prodepHelp.'},
        {key: "type", label: "Tipo", sortable: true},
        {key: "date", label: "Fecha", sortable: true},
        {key: "employee.name", label: "Beneficiario", sortable: true},
        {key: "amount", label: "Cantidad", sortable: true}
    ];
}
