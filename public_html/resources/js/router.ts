import Vue from "vue"
import VueRouter from "vue-router"
import AdminModule from './admin/admin.module.vue';
import UsersPage from './admin/users/index.vue';
import UserPermissionsPage from './admin/permissions/index.vue';
import HomeModule from './home/home.component.vue';
import AcademicUnitManagementPage from './academic-units/academic-unit-management/index.vue';
import AcademicUnitModule from './academic-units/academic-unit.module.vue';
import AcademicUnitQueryPage from './academic-units/queries.page.vue';
import AcademicUnitMembersPage from './academic-units/members/index.vue';
Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        meta: { title: 'Inicio' },
        component: HomeModule
    },
    {
        path: '/users',
        name: 'users',
        meta: { title: 'Usuarios' },
        component: AdminModule,
        children: [
            {
                path: '',
                component:  UsersPage
            },
            {
                path: 'permissions',
                component: UserPermissionsPage
            }
        ],
    },
    {
        path: '/academic-unit',
        name: 'Academic Unit',
        meta: { title: 'Cuerpos Académicos' },
        component: AcademicUnitModule,
        children: [
            {
                path: '',
                component: AcademicUnitManagementPage
            },
            {
                path: 'queries',
                component: AcademicUnitQueryPage,
            },
            {
                path: 'members',
                component: AcademicUnitMembersPage
            }
        ]
    }
];

export default new VueRouter({
    mode: 'history',
    routes: routes
})
