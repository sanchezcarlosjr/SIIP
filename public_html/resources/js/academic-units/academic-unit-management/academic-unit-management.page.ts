import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AcademicUnitManagementPage extends Vue {
    tableTitle = 'Gestión de cuerpos académicos';
    spanishResourceName = '';
    apiResource = 'academic-units';
    fields = [
        { key: 'academic_unit_name', label: 'Nombre', sortable: true },
        { key: 'promep_key', label: 'Clave PROMEP', sortable: true },
        { key: 'degree_of_consolidation', label: 'Grado', sortable: true },
        { key: 'leader_name', label: 'Encargado', sortable: true },
        { key: 'actions', label: 'Acciones' }
    ];
}

