import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class LGACPage extends Vue {
    tableTitle = `LGACS de *academic_unit.name`;
    apiResource = `academic_body(id: ${this.$route.params.id})`;
    spanishResourceName = 'LGAC'
    toolbar = new Set(['archive', 'add', 'edit']);
    fields = [
        {key: 'lgacs.key', label: 'Clave', sortable: true},
        {key: 'lgacs.name', label: 'Nombre', sortable: true},
        {key: 'lgacs.description', label: 'Descripción', sortable: true},
        {key: 'lgacs.active', label: 'Vigente', sortable: true}
    ];
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre del LGAC',
                model: 'name'
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Clave',
                model: 'key'
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'Descripción',
                model: 'description'
            },
            {
                type: "switch2",
                label: "Vigencia",
                model: "active",
                textOn: "Vigente",
                textOff: "No vigente"
            },
        ]
    };
    defaultCriteria = [
        {
        value: 'vigente',
        default: true
    },
        {
            value: 'no vigente',
            default: false
        }
        ];
}

