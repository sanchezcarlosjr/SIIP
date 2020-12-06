import Vue from "vue"
import VueRouter from "vue-router"
import UsersComponent from './users/users.component.vue';
import HomeComponent from './home/home.component.vue';
import AcademicComponent from './academic-units/academic-unit.component.vue';
import ProdepComponent from './prodep/prodep.component.vue';
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            meta: { title: 'Inicio' },
            component: HomeComponent
        },
        {
            path: '/users',
            name: 'users',
            meta: { title: 'Usuarios' },
            component: UsersComponent
        },
        {
            path: '/academic-unit',
            name: 'Academic Unit',
            meta: { title: 'Cuerpos Académicos' },
            component: AcademicComponent
        },
        {
            path: '/prodep',
            name: 'PRODEP',
            meta: { title: 'PRODEP' },
            component: ProdepComponent
        },
    ]
})
