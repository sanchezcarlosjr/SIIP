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
import router from './routes';
// @ts-ignore
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import apolloProvider from "./settings/apollo";

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

const app = new Vue({
    el: '#app',
    apolloProvider,
    router
});
