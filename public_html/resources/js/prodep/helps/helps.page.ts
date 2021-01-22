import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class HelpsPage extends Vue {
    tableTitle = "Beneficios PRODEP";
    apiResource = "prodep_helps";
    toolbar = new Set(["add"]);
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre',
                model: 'name'
            }
        ]
    };
    fields = [
        {key: "type", label: "Tipo", sortable: true},
        {key: "date", label: "Fecha", sortable: true},
        {key: "employee.name", label: "Beneficiario", sortable: true},
        {key: "amount", label: "Cantidad", sortable: true}
    ];
}
