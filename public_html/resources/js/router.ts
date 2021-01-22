import Vue from "vue"
import VueRouter from "vue-router"
import AdminModule from './admin/admin.module.vue';
import UsersPage from './admin/users/index.vue';
import UserPermissionsPage from './admin/permissions/index.vue';
import HomeModule from './home/home.component.vue';
import NotFoundPage from './not-found/index.vue';

Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        redirect: '/inicio'
    },
    {
        path: '/inicio',
        name: 'Inicio',
        icon: 'fa-home',
        meta: { title: 'Inicio' },
        component: HomeModule
    },
    {
        path: '/usuarios',
        name: 'Usuarios',
        icon: 'fa-users',
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
        path: '/cuerpos-academicos',
        name: 'Cuerpos Académicos',
        icon: 'fa-address-card',
        meta: {title: 'Cuerpos Académicos'},
        component: () => import('./academic-bodies/academic-body.module.vue'),
        children: [
            {
                path: '',
                component: () => import('./academic-bodies/academic-body-management/index.vue')
            },
            {
                path: 'redes',
                component: () => import('./academic-bodies/networks/index.vue')
            },
            {
                path: 'evaluaciones',
                component: () => import('./academic-bodies/evaluations/index.vue')
            },
            {
                path: 'ayudas',
                component: () => import('./academic-bodies/helps/index.vue')
            },
            {
                path: 'miembros',
                component: () => import('./academic-bodies/members/index.vue')
            },
            {
                path: 'lgacs',
                component: () => import('./academic-bodies/lgac/index.vue')
            },
            {
                path: ':id/lgacs',
                component: () => import('./academic-bodies/lgac-by-academic-body/index.vue')
            },
            {
                path: ':id/evaluaciones',
                component: () => import('./academic-bodies/evaluations-by-academic-body/index.vue')
            },
            {
                path: ':id/miembros',
                component: () => import('./academic-bodies/members-by-academic-body/index.vue')
            },
            {
                path: ':id/apoyos',
                component: () => import('./academic-bodies/helps-by-academic-body/index.vue')
            },
            {
                path: ':id/redes',
                component: () => import('./academic-bodies/networks-by-academic-body/index.vue')
            }
        ]
    },
    {
        path: '/prodep',
        name: 'PRODEP',
        icon: 'fa-university',
        meta: { title: 'PRODEP' },
        component: () => import('./prodep/prodep.module.vue'),
        children: [
            {
                path: '',
                component:  () => import('./prodep/prodep/index.vue')
            }
        ],
    },
    {
        path: '*', component: NotFoundPage
    },
];

export default new VueRouter({
    mode: 'history',
    routes: routes
})
