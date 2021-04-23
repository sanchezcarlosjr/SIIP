import Vue from "vue";
import Component from "vue-class-component";
// @ts-ignore
import VueFormGenerator from "vue-form-generator/dist/vfg-core.js";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";
import AcademicBodyStatistics from './statistics/index.vue';

@Component({
    components: {
        AcademicBodyStatistics
    }
})
export default class AcademicBodyManagementPage extends Vue {
    apiResource = GraphqlResourceRepository.createDefaultRepository('academic_bodies(orderBy: {field: CREATED_AT, order: DESC}, filter: $filter)', {index: 'active'});
    toolbar = new Set(['add', 'edit']);
    defaultCriteria = [
      {
        type: "xor",
        criteria: [
          {
            value: 'Vigente',
            default: true
          },
          {
            value: 'No vigente'
          }
        ]
      },
      {
        type: "xor",
        criteria: [
          {
              value: 'Mexicali'
          },
          {
              value: 'Ensenada'
          },
          {
              value: 'Tijuana'
          }
        ]
      },
      {
        type: "or",
        criteria: [
          {
            value: "En formación"
          },
          {
            value: "En consolidación"
          },
          {
            value: "Consolidado"
          }
        ]
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
                label: 'Área del conocimiento',
                model: "prodep_area_id",
                query: 'prodep_areas',
                find: 'prodep_area',
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
                find: 'desSearcher',
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
        {key: 'name', label: 'Nombre', sortable: true, editable: true, class: 'vw-20'},
        {key: 'last_evaluation.grade', label: 'Grado de consolidación', sortable: true, editable: true, class: 'vw-5'},
        {key: 'prodep_key', label: 'Clave PRODEP', sortable: true, editable: true, class: 'vw-5'},
        {key: `leader.academic_unit.name`, label: 'Unidad Académica', sortable: true, editable: false},
        {key: 'discipline', label: 'Disciplina', sortable: true, editable: false, visible: false},
        {key: 'prodep_area.name', label: 'Area PRODEP', sortable: true, editable: false, visible: false}
    ];

    createdElement(element: any) {
        const academic_body = element['createAcademicBody'];
        this.$router.push(`/cuerpos-academicos/${academic_body.id}/lgac?createResource`);
    }
}
