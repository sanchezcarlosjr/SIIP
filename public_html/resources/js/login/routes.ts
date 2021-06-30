export const LoginRoutes = {
    path: '/',
    name: 'login',
    meta: {title: 'Inicio de sesión para SIIIP'},
    component: () => import('./index.vue')
};
