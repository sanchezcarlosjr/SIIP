import Vue from "vue"
import VueRouter from "vue-router"
import UserModule from './users/users.component.vue';
import HomeModule from './home/home.component.vue';
import AcademicUnitManagementPage from './academic-units/academic-unit-management.component.vue';
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
        icon: 'fa-home',
        component: HomeModule
    },
    {
        path: '/users',
        name: 'users',
        meta: { title: 'Usuarios' },
        icon: '',
        component: UserModule
    },
    {
        path: '/academic-unit',
        name: 'Academic Unit',
        meta: { title: 'Cuerpos Académicos' },
        component: AcademicUnitModule,
        icon: '',
        children: [
            {
                path: '',
                meta: { title: 'Cuerpos Académicos' },
                component: AcademicUnitManagementPage
            },
            {
                path: 'queries',
                component: AcademicUnitQueryPage,
                icon: ''
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
