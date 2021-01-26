import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class MembersPage extends Vue {
    apiResource = 'employees';
    spanishResourceName = 'miembro'
    toolbar = new Set<String>([]);
    fields = [
        { key: 'name', label: 'Nombre', sortable: true },
        { key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        { key: 'academic_body', label: 'Cuerpos Académicos', sortable: true},
        { key: 'grado', label: 'Grado', sortable: true}
    ];
    defaultCriteria = [{
        value: 'Próximos a jubilarse',
        default: false
    },
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
