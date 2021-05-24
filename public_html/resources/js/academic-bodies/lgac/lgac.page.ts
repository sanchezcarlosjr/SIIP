import { Component, Vue } from 'vue-property-decorator';
import { lgac } from "../../@shared/repositories/academic_bodies/lgac/repository.ts";

@Component
export default class LGACPage extends Vue {
  resource = lgac;
  criteria = [];
  fields = [
    {key: 'name', label: 'LGAC', sortable: true},
    {key: 'academic_body.name', label: 'Cuerpo académico', sortable: true},
    {key: 'academic_body.prodep_area.name', label: 'Área del conocimiento', sortable: true},
    {key: `academic_body.leader.academic_unit.name`, label: 'Unidad Académica', sortable: true}
  ];
  formSchemas = {
    detail: {
      legend: "LGAC",
      fields: [
        {
          type: 'label',
          label: 'Nombre',
          model: 'name'
        }
      ]
    }
  };
}
