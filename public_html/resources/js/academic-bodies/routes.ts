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
            component: () => import('./academic-body-management/index.vue')
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
        },
        {
            path: ':id',
            name: '',
            props: {
                queryName: 'ABC',
            },
            component: () => import('./academic-body-viewer.module.vue'),
            children: [
                {
                    path: '',
                    redirect: 'editar'
                },
                {
                    path: 'editar',
                    name: "Editar cuerpo académico",
                    component: () => import('./academic-body/index.vue')
                },
                {
                    path: 'lgac',
                    name: 'Líneas de Generación y Aplicación de Conocimiento',
                    component: () => import('./lgac-by-academic-body/index.vue')
                },
                {
                    path: 'evaluaciones',
                    name: 'Evaluaciones',
                    component: () => import('./evaluations-by-academic-body/index.vue')
                },
                {
                    path: 'miembros',
                    name: 'Miembros',
                    component: () => import('./members-by-academic-body/index.vue')
                },
                {
                    path: 'apoyos',
                    name: 'Apoyos',
                    component: () => import('./helps-by-academic-body/index.vue')
                },
                {
                    path: 'redes',
                    name: 'Redes',
                    component: () => import('./networks-by-academic-body/index.vue')
                },
                {
                    path: 'colaboradores',
                    name: 'Colaboradores',
                    component: () => import('./collaborators-by-academic-body/index.vue')
                }
            ]
        },
    ]
};
