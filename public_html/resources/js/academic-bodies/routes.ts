export const AcademicBodyRoutes = {
    path: '/cuerpos-academicos',
    name: 'Cuerpos Académicos',
    icon: 'fa-address-card',
    meta: {title: 'Cuerpos Académicos'},
    component: () => import('./academic-body.module.vue'),
    children: [
        {
            path: '',
            name: 'Gestión',
            component: () => import('./academic-body-management/index.vue'),
            children: [
                {
                    path: ':id/lgac',
                    name: 'LGAC',
                    component: () => import('./lgac-by-academic-body/index.vue')
                },
                {
                    path: ':id/evaluaciones',
                    name: 'Evaluaciones',
                    component: () => import('./evaluations-by-academic-body/index.vue')
                },
                {
                    path: ':id/miembros',
                    name: 'Miembros',
                    component: () => import('./members-by-academic-body/index.vue')
                },
                {
                    path: ':id/apoyos',
                    name: 'Apoyos',
                    component: () => import('./helps-by-academic-body/index.vue')
                },
                {
                    path: ':id/redes',
                    name: 'Redes',
                    component: () => import('./networks-by-academic-body/index.vue')
                }
            ]
        },
        {
            path: 'redes',
            name: 'Redes',
            component: () => import('./networks/index.vue')
        },
        {
            path: 'evaluaciones',
            name: 'Evaluaciones',
            component: () => import('./evaluations/index.vue')
        },
        {
            path: 'apoyos',
            name: 'Apoyos',
            component: () => import('./helps/index.vue')
        },
        {
            path: 'miembros',
            name: 'Miembros',
            component: () => import('./members/index.vue')
        },
        {
            path: 'lgac',
            name: 'LGAC',
            component: () => import('./lgac/index.vue')
        }
    ]
};
