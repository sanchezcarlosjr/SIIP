import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class SniPage extends Vue {
    tableTitle = "Gestión SNI";
    apiResource = "snis";
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
        {key: "employee.name", label: "Beneficiario", sortable: true},
        {key: "employee.academic_unit.name", label: "Unidad académica", sortable: true},
        {key: "level", label: "Nivel", sortable: true},
        {key: "start_date", label: "Fecha de inicio", sortable: true},
        {key: "finish_date", label: "Fecha fin", sortable: true},
        {key: "request", label: "Solicitud", sortable: true},
        {key: "sni_area.name", label: "Área SNI", sortable: true}
    ];
}
