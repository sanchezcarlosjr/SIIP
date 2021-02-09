export const ActivityPitRoutes = {
    path: '/propiedad-intelectual',
    name: 'Propiedad intelectual',
    meta: {title: 'Propiedad intelectual'},
    icon: 'fa-brain',
    component: () => import('./activities-pits.module.vue'),
    children: [
        {
            name: 'Gestion',
            path: '',
            component: () => import('./activities-pits/index.vue')
        }
    ]
};
