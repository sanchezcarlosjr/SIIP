export const ProdepRoutes = {
    path: '/prodep',
    name: 'PRODEP',
    icon: 'fa-university',
    meta: {title: 'PRODEP'},
    component: () => import('./prodep.module.vue'),
    children: [
        {
            name: 'Gestión',
            path: '',
            component: () => import('./prodep/index.vue')
        },
        {
            name: 'Beneficios',
            path: 'beneficios',
            component: () => import('./helps/index.vue')
        }
        ,
        {
            name: 'NPTCS',
            path: 'nptcs',
            component: () => import('./nptcs/index.vue')
        }
    ],
};