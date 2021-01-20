import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class NetworksPage extends Vue {
    tableTitle = 'Todas las redes';
    apiResource = 'networks';
    spanishResourceName = 'red'
    toolbar = new Set<String>([]);
    fields = [
        {key: 'academic_body.name', label: 'Nombre', sortable: true},
        {key: 'name', label: 'Nombre del grupo de investigación', sortable: true},
        {key: 'class', label: 'Clase', sortable: true},
        {key: 'type', label: 'Tipo', sortable: true},
        {key: 'range', label: 'Alcance', sortable: true},
        {key: 'finish_date', label: 'Fecha de fin', sortable: true},
        {key: 'academic_body.leader.name', label: 'Líder', sortable: true}
    ];
    defaultCriteria = [
        {
            value: 'Líderes',
            default: false
        },
        {
            value: 'Mexicali',
            default: false
        },
        {
            value: 'Ensenada',
            default: false
        },
        {
            value: 'Tijuana',
            default: false
        }];
}