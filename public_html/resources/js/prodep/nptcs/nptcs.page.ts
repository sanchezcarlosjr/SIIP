import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class NptcsPage extends Vue {
    tableTitle = "NPTC";
    apiResource = GraphqlResourceRepository.createDefaultRepository('prodep_nptcs');
    spanishResourceName = "NPTC";
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
        {key: "amount", label: "Cantidad", sortable: true},
        {key: "type", label: "Tipo", sortable: true},
        {key: "date", label: "Fecha", sortable: true},
        {key: "employee.name", label: "Beneficiario", sortable: true},
        {key: "employee.academic_unit.name", label: "Unidad académica", sortable: true}
    ];
}
