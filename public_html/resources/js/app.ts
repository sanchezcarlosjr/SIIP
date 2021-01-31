require('./bootstrap');
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import Vue from 'vue';
import CardTitleComponent from './@shared/card-title.component.vue';
import SiipBreadcrumb from './@shared/breadcrumb.component.vue';
import CSVButton from './@shared/csv-button/index.vue';
import PDFButton from './@shared/pdf-button/index.vue';
import SiipTableComponent from "./@shared/siip-table/index.vue";
import VfgFieldCalendar from './@shared/vfg-field-calendar/index.vue';
import VfgFieldEmail from './@shared/vfg-field-email/index.vue';
import VfgFieldApiSelect from './@shared/vfg-field-select-api/index.vue';
import VfgFieldGraphQLSelect from './@shared/vfg-field-select-graphql/index.vue';
import VfgFieldSwitch from './@shared/vfg-field-switch/index.vue';
import EntryComponent from './entry.component.vue';
import SiipChartComponent from './@shared/siip-table/chart/RandomChart.vue';
import ContextMenu from './@shared/context-menu/context-menu.component.vue';
import router from './router';
// @ts-ignore
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

const VueFormGenerator = require('vue-form-generator');
    

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator);

Vue.component('entry-component', EntryComponent)
Vue.component('card-title-component', CardTitleComponent)
Vue.component('pdf-button', PDFButton)
Vue.component('csv-button', CSVButton)
Vue.component('siip-table', SiipTableComponent);
Vue.component('siip-breadcrumb', SiipBreadcrumb)
Vue.component('field-calendar', VfgFieldCalendar);
Vue.component('field-switch2', VfgFieldSwitch);
Vue.component('field-api-select', VfgFieldApiSelect);
Vue.component('field-email', VfgFieldEmail);
Vue.component('field-graphql-select', VfgFieldGraphQLSelect);
Vue.component('siip-chart', SiipChartComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('context-menu', ContextMenu);

router.beforeEach((to, from, next) => {
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

const app = new Vue({
    el: '#app',
    router
});
