import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ActivitiesPitsPage extends Vue {
    tableTitle = "Actividades propiedad intelectual";
    apiResource = "activities_pits";
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
        {key: "name_event", label: "Evento", sortable: true},
        {key: "asistence", label: "Asistencia", sortable: true},
        {key: "goal", label: "Objetivo", sortable: true},
        {key: "date", label: "Fecha", sortable: true},
        {key: "academic_unit.name", label: "Unidad académica", sortable: true}
    ];
}
