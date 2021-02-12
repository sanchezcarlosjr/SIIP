import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

enum Role {
    COORDINATOR_UA = 3,
    CAMPUS_MANAGER = 14
}

@Component
export default class UsersPage extends Vue {
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre',
                model: 'name'
            },
            {
                type: 'email',
                label: 'Correo electrónico',
                model: 'email',
            },
            {
                type: 'api-select',
                label: 'Rol',
                model: "role_id",
                api: 'api/roles',
                textKey: 'role'
            },
            {
                type: 'api-select',
                label: 'Campus',
                model: "campus",
                api: 'api/roles',
                textKey: 'role',
                visible: (model: { role_id: number }) => model && [Role.COORDINATOR_UA, Role.CAMPUS_MANAGER].indexOf(model.role_id) !== -1,
            },
            {
                type: 'api-select',
                label: 'Unidad Académica',
                model: "unit",
                api: 'api/roles',
                textKey: 'role',
                visible: (model: { role_id: number }) => model && [Role.COORDINATOR_UA].indexOf(model.role_id) !== -1,
            }
        ]
    };
    fields = [
        { key: 'name', label: 'Nombre', sortable: true },
        { key: 'email', label: 'Correo Electrónico	', sortable: true },
        { key: 'unit', label: 'Unidad Académica', sortable: true },
        { key: 'campus', label: 'Campus', sortable: true }
    ];
    tableTitle = 'Gestión de usuarios';
    apiResource = GraphqlResourceRepository.createDefaultRepository('users');
    spanishResourceName = 'usuario';
}

