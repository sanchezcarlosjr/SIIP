import Component from "vue-class-component";
import { Mixins } from 'vue-property-decorator';
const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldCalendar extends Mixins(VueFormGenerator.abstractField) {
}