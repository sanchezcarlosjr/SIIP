import { Component, Vue } from 'vue-property-decorator';
import { validator as GraphQLSelectIdValidator } from "../../@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"
import { collaborators } from "../../@shared/repositories/academic_bodies/collaborators/repository.ts";
import { employees } from "../../@shared/repositories/employees/repository.ts";

@Component
export default class CollaboratorsPage extends Vue {
  resource = collaborators;
  criteria = [];
  formSchemas = {
    create: {
      legend: "Colaborador",
      fields: [
        {
          type: 'graphql-select-id',
          label: 'Nombre del empleado*',
          model: "employee.name",
          query: {
            resource: employees,
            target: "name",
            ref: "employee_id",
            scopes: [
              {
                name: "name_or_id"
              }
            ]
          },
          required: true,
          hint: "Número de Empleado: ",
          validator: GraphQLSelectIdValidator({
            selectValid: "Seleccione un empleado válido"
          })
        }
      ]
    },
    detail: {
      legend: "Empleado",
      fields: [
          {
              type: 'label',
              label: 'Nombre',
              model: 'name'
          },
          {
              type: 'label',
              label: 'Correo electrónico',
              model: 'correo1'
          },
          {
              type: 'label',
              label: 'Edad',
              model: 'age'
          },
          {
              type: 'label',
              label: 'Unidad Académica',
              model: 'academic_unit.name'
          },
          {
              type: 'label',
              label: 'Sexo',
              model: 'sexo'
          },
          {
              type: 'label',
              label: 'Grado',
              model: 'grado'
          },
          {
              type: 'label',
              label: '¿Es PTC?',
              model: 'is_ptc',
              get: (employee: { is_ptc: boolean }) => (employee && employee.is_ptc) ? "Sí" : "No"
          },
          {
              type: "label",
              label: "¿Es un perfil PRODEP activo?",
              model: "has_active_prodep_profile",
              get: (employee: { has_active_prodep_profile: boolean }) => (employee && employee.has_active_prodep_profile) ? "Sí" : "No"
          },
          {
              type: 'label',
              label: '¿Es un SNI activo?',
              model: 'has_active_sni',
              get: (employee: { has_active_sni: boolean }) => (employee && employee.has_active_sni) ? "Sí" : "No"
          },
          {
              type: 'label',
              label: '¿Es un profesor-investigador?',
              model: 'is_researcher',
              get: (employee: { is_researcher: boolean }) => (employee && employee.is_researcher) ? "Sí" : "No"
          }
      ]
    }
  }
  fields = [
    {key: 'name', label: 'Nombre', sortable: true, class: 'w-40'},
    {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
    {key: 'academic_unit.campus', label: 'Campus', sortable: true}
  ];
}
