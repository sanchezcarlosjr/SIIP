import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class NetworksPage extends Vue {
    tableTitle = `Redes de *academic_unit.name`;
    apiResource = `academic_body(id: ${this.$route.params.id})`;
    spanishResourceName = 'red'
    toolbar = new Set<String>(['add', 'edit']);
    fields = [
        {key: 'networks.name', label: 'Nombre del grupo de investigación', sortable: true},
        {key: 'networks.class', label: 'Clase', sortable: true},
        {key: 'networks.type', label: 'Tipo', sortable: true},
        {key: 'networks.range', label: 'Alcance', sortable: true},
        {key: 'networks.start_date', label: 'Fecha de inicio', sortable: true},
        {key: 'networks.finish_date', label: 'Fecha de fin', sortable: true},
        {key: 'networks.academic_body.leader.name', label: 'Líder', sortable: true}
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
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre del grupo de investigación',
                model: 'name'
            },
            {
                type: 'select',
                label: 'Clase',
                model: 'class',
                values: ['CA', 'Red', 'Institución']
            },
            {
                type: 'select',
                label: 'Tipo',
                model: 'type',
                values: ['Interno', 'Externo']
            },
            {
                type: 'select',
                label: 'Alcance',
                model: 'range',
                values: ['Regional', 'Nacional', 'Internacional']
            },
            {
                type: 'calendar',
                label: 'Fecha de inicio',
                model: 'start_date'
            },
            {
                type: 'calendar',
                label: 'Fecha de fin',
                model: 'finish_date'
            },
        ]
    };
}
