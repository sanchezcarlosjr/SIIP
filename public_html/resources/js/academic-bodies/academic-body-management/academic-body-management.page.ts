import Vue from "vue";
import Component from "vue-class-component";
// @ts-ignore
import VueFormGenerator from "vue-form-generator/dist/vfg-core.js";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";
import AcademicBodyStatistics from './academic-body-statistics.vue';

@Component({
    components: {
        AcademicBodyStatistics
    }
})
export default class AcademicBodyManagementPage extends Vue {
    apiResource = new GraphqlResourceRepository('academic_bodies', {
        index: 'active'
    }, 'updateAcademicBodies', 'createAcademicBodies', 'updateAcademicBodyInput', 'createAcademicBodyInput');
    toolbar = new Set(['add', 'edit']);
    defaultCriteria = [
        {
            value: 'Vigente',
            default: false
        },
        {
            value: 'Sin vigencia',
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
        }
    ];
    links = {
        'edit': {
            link: '/cuerpos-academicos/*/editar',
            tooltip: 'Detalles de cuerpo académico'
        },
        'project-diagram': {
            link: '/cuerpos-academicos/*/lgac',
            tooltip: 'LGAC'
        },
        'user-tie': {
            link: '/cuerpos-academicos/*/miembros',
            tooltip: 'Miembros'
        },
        'file-alt': {
            link: '/cuerpos-academicos/*/evaluaciones',
            tooltip: 'Evaluaciones'
        },
        'hand-holding-usd': {
            link: '/cuerpos-academicos/*/apoyos',
            tooltip: 'Apoyos'
        },
        'network-wired': {
            link: '/cuerpos-academicos/*/redes',
            tooltip: 'Redes'
        }
    };
    schema = {
        fields: [
            {
                type: "input",
                inputType: "text",
                label: "Nombre del cuerpo académico",
                model: "name",
                readonly: false,
                featured: false,
                required: true,
                disabled: false,
                placeholder: "",
                validator: VueFormGenerator.validators.string.locale({
                    fieldIsRequired: ""
                })
            },
            {
                type: "input",
                inputType: "text",
                label: 'Clave PRODEP',
                model: 'prodep_key',
                readonly: false,
                featured: false,
                required: true,
                disabled: false,
                placeholder: "",
                validator: VueFormGenerator.validators.string.locale({
                    fieldIsRequired: ""
                })
            },
            {
                type: "switch2",
                label: "Vigencia",
                model: "active",
                textOn: "Vigente",
                textOff: "No vigente"
            },
            {
                type: 'graphql-select',
                label: 'Líder de cuerpo académico',
                model: "lead_employee_id",
                query: 'employees',
                textKey: 'name',
                hint: 'Número o nombre de empleado',
                readonly: false,
                featured: false,
                required: true,
                disabled: false,
                placeholder: "",
                validator: VueFormGenerator.validators.string.locale({
                    fieldIsRequired: ""
                }),
            },
            {
                type: 'graphql-select',
                label: 'Área del conocimiento',
                model: "prodep_area_id",
                query: 'prodep_areas',
                textKey: 'name',
                readonly: false,
                featured: false,
                required: true,
                disabled: false,
                placeholder: "",
                validator: VueFormGenerator.validators.string.locale({
                    fieldIsRequired: ""
                }),
            },
            {
                type: "input",
                inputType: "text",
                label: 'Disciplina',
                model: 'discipline',
                readonly: false,
                featured: false,
                required: true,
                disabled: false,
                placeholder: "",
                validator: VueFormGenerator.validators.string.locale({
                    fieldIsRequired: ""
                })
            },
            {
                type: 'graphql-select',
                label: 'DES',
                model: "des_id",
                query: 'des',
                textKey: 'des',
                readonly: false,
                featured: false,
                required: true,
                disabled: false,
                placeholder: "",
                validator: VueFormGenerator.validators.string.locale({
                    fieldIsRequired: ""
                }),
            }
        ]
    };
    fields = [
        {key: 'name', label: 'Nombre', sortable: true, editable: true},
        {key: 'last_evaluation.grade', label: 'Grado de consolidación', sortable: true, editable: true},
        {key: 'prodep_key', label: 'Clave PRODEP', sortable: true, editable: true},
        {key: `leader.academic_unit.name`, label: 'Unidad Académica', sortable: true, editable: false}
    ];
}

