import AdminModule from "./admin.module.vue";
import UsersPage from "./users/index.vue";
import UserPermissionsPage from "./permissions/index.vue";

export const AdminRoutes = {
    path: '/usuarios',
    name: 'Usuarios',
    icon: 'fa-users',
    meta: {title: 'Usuarios'},
    component: AdminModule,
    children: [
        {
            path: '',
            name: 'Gestión',
            component: UsersPage
        },
        {
            name: 'Permisos',
            path: 'permisos',
            component: UserPermissionsPage
        }
    ],
};
