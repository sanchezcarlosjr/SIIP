import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ResearcherPage extends Vue {
    tableTitle = "Gestión Profesor-investigador";
    apiResource = "researchers";
    spanishResourceName = "investigador";
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
        {key: "valid", label: "Fecha de otorgamiento", sortable: true},
        {key: "probative", label: "Probatorio", sortable: true}
    ];
}
