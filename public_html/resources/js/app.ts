require('./bootstrap');
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import Vue from 'vue';
import SiipBreadcrumb from './@shared/application/breadcrumb.component.vue';
import CSVButton from './@shared/application/csv-button/index.vue';
import PDFButton from './@shared/application/pdf-button/index.vue';
import SiipTableComponent from "./@shared/siip-table/index.vue";
import VfgFieldCalendar from './@shared/application/form-fields/vfg-field-calendar/index.vue';
import VfgFieldEmail from './@shared/application/form-fields/vfg-field-email/index.vue';
import VfgFieldApiSelect from './@shared/application/form-fields/vfg-field-select-api/index.vue';
import VfgFieldGraphQLSelect from './@shared/application/form-fields/vfg-field-select-graphql/index.vue';
import VfgFieldUpload from './@shared/application/form-fields/vfg-field-upload/index.vue';
import VfgFieldSwitch from './@shared/application/form-fields/vfg-field-switch/index.vue';
import EntryComponent from './entry.component.vue';
import AcademicBodyLgacs from './academic-bodies/lgac-by-academic-body/index.vue';
import ContextMenu from './@shared/application/context-menu/context-menu.component.vue';
// @ts-ignore
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import apolloProvider from "./settings/apollo";
import router from './routes';
import VfgFieldGraphQLSelectID from './@shared/application/form-fields/vfg-field-select-graphql-id/index.vue';
// @ts-ignore
import VueFormGenerator from "vue-form-generator/dist/vfg-core.js";


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator);

Vue.component('entry-component', EntryComponent)
Vue.component('pdf-button', PDFButton)
Vue.component('csv-button', CSVButton)
Vue.component('siip-table', SiipTableComponent);
Vue.component('siip-breadcrumb', SiipBreadcrumb)
Vue.component('field-calendar', VfgFieldCalendar);
Vue.component('field-switch2', VfgFieldSwitch);
Vue.component('field-api-select', VfgFieldApiSelect);
Vue.component('field-email', VfgFieldEmail);
Vue.component('field-graphql-select', VfgFieldGraphQLSelect);
Vue.component('field-graphql-select-id', VfgFieldGraphQLSelectID)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('context-menu', ContextMenu);
Vue.component('siip-academic-body-lgacs', AcademicBodyLgacs);

const app = new Vue({
    el: '#app',
    apolloProvider,
    router
});
