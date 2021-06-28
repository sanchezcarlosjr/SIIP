import AdminModule from "./admin.module.vue";
import UsersPage from "./users/index.vue";
import UserPermissionsPage from "./permissions/index.vue";

export const AdminRoutes = {
    path: '/usuarios',
    name: 'Usuarios',
    icon: 'fa-users',
    meta: {title: 'Usuarios'},
    component: () => import('./admin.module.vue'),
    children: [
        {
            path: '',
            name: 'Gestión',
            component: () => import('./users/index.vue')
        },
        {
            name: 'Permisos',
            path: 'permisos',
            component: () => import('./permissions/index.vue')
        }
    ],
};
