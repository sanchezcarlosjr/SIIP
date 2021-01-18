import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class LGACPage extends Vue {
    tableTitle = 'Todas las Líneas de Generación y Aplicación de Conocimiento';
    apiResource = 'lgacs';
    spanishResourceName = 'LGAC'
    toolbar = new Set<string>([]);
    defaultCriteria = [{
        value: 'vigente',
        default: true
    },
    {
        value: 'no vigente',
        default: false
    }];
    fields = [
        { key: 'key', label: 'Clave', sortable: true },
        { key: 'name', label: 'Nombre', sortable: true },
        { key: 'description', label: 'Descripción', sortable: true },
    ];
}

