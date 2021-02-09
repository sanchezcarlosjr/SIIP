export const SniRoutes = {
    path: '/sni',
    name: 'SNI',
    icon: 'fa-podcast',
    meta: {title: 'SNI'},
    component: () => import('./sni.module.vue'),
    children: [
        {
            name: 'Gestión',
            path: '',
            component: () => import('./sni/index.vue')
        },
        {
            name: 'Profesor-Investigador',
            path: 'investigadores',
            component: () => import('./researcher/index.vue')
        }
    ]
};