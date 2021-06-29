import Vue from "vue"
import VueRouter, {RouteConfig} from "vue-router"
import NotFoundPage from './not-found/index.vue';
import {HomeRoutes} from "./home/routes";
import {LoginRoutes} from "./login/routes";
import {AdminRoutes} from "./admin/routes";
import {AcademicBodyRoutes} from "./academic-bodies/routes";
import {ProdepRoutes} from "./prodep/routes";
import {SniRoutes} from "./sni/routes";
import {ResearchRoutes} from "./researcher/routes";
import {ActivityPitRoutes} from "./activities-pits/routes";
import state from "./store/store";

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
    LoginRoutes,
    {
        path: '/inicio',
        name: 'siiip',
        meta: {
            requiresAuth: true,
        },
        component: () => import('./shell.component.vue'),
        children: [
            HomeRoutes,
            AdminRoutes,
            AcademicBodyRoutes,
            ProdepRoutes,
            SniRoutes,
            ResearchRoutes,
            ActivityPitRoutes,
        ]
    },
    {
        path: '*',
        component: NotFoundPage,
        name: "not-found"
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
    if (to.matched.some((record) => record.meta.requiresAuth) && !state.user.token) {
        let path = `/?redirectTo=${to.fullPath}`;
        next(path);
        return;
    }
    if (to.name === 'login' && state.user.token) {
        next('/inicio');
        return;
    }
    const path = to.matched[to.matched.length - 1].path;
    const pathNoSlash = path[path.length - 1] == "/" ? path.substring(0, path.length - 1) : path;
    const hasPermission = state.user.permissions.hasOwnProperty(pathNoSlash);
    if (state.user.token && !hasPermission) {
        next('/inicio');
        return;
    }
    next();
});

export default router
