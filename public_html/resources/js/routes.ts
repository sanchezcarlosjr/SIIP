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
        path: '*', component: NotFoundPage
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth) && !state.user.token) {
        let path = `/?redirectTo=${to.fullPath}`;
        next(path);
    }
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    // @ts-ignore
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    if (to.name === 'login' && state.user.token) {
        next('/inicio');
    }

    if (state.user.token && !state.user.permissions[to.path]) {
        next('/inicio');
    }

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map((tagDef: { [x: string]: string; }) => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
        // Add the meta tags to the document head.
        .forEach((tag: any) => document.head.appendChild(tag));

    next();
});

export default router
