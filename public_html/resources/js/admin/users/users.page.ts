import Vue from "vue";
import Component from "vue-class-component";
import {users} from "../../@shared/repositories/users/repository";
import {employees} from "../../@shared/repositories/employees/repository";
import {campus, gender} from "../../@shared/search-criteria/search-criteria";
import {Permission} from "../../store/auth/permission";

const words = [
    'Erg0',
    'c0g1t0',
    'sum',
    'v1d1',
    'v1n1',
    'v3nc1',
    'Kr1t1k',
    'der',
    'praktisch3n',
    'V3rnunft',
    'Kr1t1k',
    'r3in3n',
    'buffalo',
    'buffal0',
    'buffal0',
    'buffal0',
    'si',
    'el',
    'g3n3r0',
    's3',
    'ha11a',
    '3n',
    'pr0gr3s0',
    'c0nstant3',
    'hacia',
    'm3j0r'
];

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
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
        },
        {
            type: 'input',
            inputType: "text",
            disabled: true,
            label: 'Contraseña',
            model: "password",
            get: function (model: { password: string }) {
                model.password = words[random(0, words.length - 1)] + words[random(0, words.length - 1)] + words[random(0, words.length - 1)];
                return model.password;
            }
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

