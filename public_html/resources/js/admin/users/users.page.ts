import Vue from "vue";
import Component from "vue-class-component";
import {users} from "../../@shared/repositories/users/repository";
import {employees} from "../../@shared/repositories/employees/repository";
import {campus, gender} from "../../@shared/search-criteria/search-criteria";
import {Permission} from "../../store/auth/permission";

enum Role {
    COORDINATOR_UA = 3,
    CAMPUS_MANAGER = 14
}

const schema = {
    legend: "usuario",
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
            required: false,
            hint: "Número de Empleado: "
        },
        {
            type: 'api-select',
            label: 'Rol',
            model: "role_id",
            api: 'api/roles',
            textKey: 'role'
        }
    ]
};

const formSchema = new Permission('/usuarios', {
    create: schema,
    edit: schema
});

@Component
export default class UsersPage extends Vue {
    criteria = [
        gender,
        campus,
    ];
    formSchemas = formSchema.hasPermissions();
    fields = [
        {key: 'employee.name', label: 'Nombre', sortable: true,},
        {key: 'employee.correo1', label: 'Correo Electrónico', sortable: true},
        {key: 'employee.academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'employee.academic_unit.campus', label: 'Campus', sortable: true}
    ];
    tableTitle = 'Gestión de usuarios';
    resource = users;
    spanishResourceName = 'usuario';
}

