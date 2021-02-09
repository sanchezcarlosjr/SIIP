import HomeModule from "./home.component.vue";

export const HomeRoutes = [
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
    }
]
