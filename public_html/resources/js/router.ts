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
        meta: {title: 'Inicio'},
        component: HomeModule
    },
    {
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
                name: 'Gestión',
                component: () => import('./academic-bodies/academic-body-management/index.vue')
            },
            {
                path: 'redes',
                name: 'Redes',
                component: () => import('./academic-bodies/networks/index.vue')
            },
            {
                path: 'evaluaciones',
                name: 'Evaluaciones',
                component: () => import('./academic-bodies/evaluations/index.vue')
            },
            {
                path: 'apoyos',
                name: 'Apoyos',
                component: () => import('./academic-bodies/helps/index.vue')
            },
            {
                path: 'miembros',
                name: 'Miembros',
                component: () => import('./academic-bodies/members/index.vue')
            },
            {
                path: 'lgacs',
                name: 'LGACS',
                component: () => import('./academic-bodies/lgac/index.vue')
            },
            {
                path: ':id/lgacs',
                name: 'LGAC',
                component: () => import('./academic-bodies/lgac-by-academic-body/index.vue')
            },
            {
                path: ':id/evaluaciones',
                name: 'Evaluacion',
                component: () => import('./academic-bodies/evaluations-by-academic-body/index.vue')
            },
            {
                path: ':id/miembros',
                name: 'Miembro',
                component: () => import('./academic-bodies/members-by-academic-body/index.vue')
            },
            {
                path: ':id/apoyos',
                name: 'Apoyo',
                component: () => import('./academic-bodies/helps-by-academic-body/index.vue')
            },
            {
                path: ':id/redes',
                name: 'Red',
                component: () => import('./academic-bodies/networks-by-academic-body/index.vue')
            },
            {
                path: ':id',
                name: 'Cuerpo Académico',
                component: () => import('./academic-bodies/academic-body-management/index.vue')
            }
        ]
    },
    {
        path: '/prodep',
        name: 'PRODEP',
        icon: 'fa-university',
        meta: {title: 'PRODEP'},
        component: () => import('./prodep/prodep.module.vue'),
        children: [
            {
                name: 'Gestión',
                path: '',
                component: () => import('./prodep/prodep/index.vue')
            },
            {
                name: 'Beneficios',
                path: 'beneficios',
                component: () => import('./prodep/helps/index.vue')
            }
            ,
            {
                name: 'NPTCS',
                path: 'nptcs',
                component: () => import('./prodep/nptcs/index.vue')
            }
        ],
    },
    {
        path: '/sni',
        name: 'SNI',
        icon: 'fa-podcast',
        meta: {title: 'SNI'},
        component: () => import('./sni/sni.module.vue'),
        children: [
            {
                name: 'Gestión',
                path: '',
                component: () => import('./sni/sni/index.vue')
            },
            {
                name: 'Profesor-Investigador',
                path: 'investigadores',
                component: () => import('./sni/researcher/index.vue')
            }
        ]
    },
    {
        path: '/propiedad-intelectual',
        name: 'Propiedad intelectual',
        meta: {title: 'Propiedad intelectual'},
        icon: 'fa-brain',
        component: () => import('./activities-pits/activities-pits.module.vue'),
        children: [
            {
                name: 'Gestion',
                path: '',
                component: () => import('./activities-pits/activities-pits/index.vue')
            }
        ]
    },
    {
        path: '*', component: NotFoundPage
    },
];

export default new VueRouter({
    mode: 'history',
    routes: routes
})
