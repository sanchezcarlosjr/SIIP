import {Component, Vue} from 'vue-property-decorator';
import {collaborators} from "../../@shared/repositories/academic_bodies/collaborators/repository.ts";
import {membersForm} from "../members/members.page";
import {Permission} from "../../store/auth/permission";

const permission = new Permission('/cuerpos-academicos/:academic_body_id/colaboradores', membersForm);

@Component
export default class CollaboratorsPage extends Vue {
    resource = collaborators;
    criteria = [];
    formSchemas = permission.hasPermissions();
    fields = [
        {key: 'name', label: 'Nombre', sortable: true, class: 'w-40'},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'academic_unit.campus', label: 'Campus', sortable: true}
    ];
}
