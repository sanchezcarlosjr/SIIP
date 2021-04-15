import Component from "vue-class-component";
import {Mixins} from 'vue-property-decorator';

const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldUpload extends Mixins(VueFormGenerator.abstractField) {
    upload(e: any) {
        e.stopPropagation();
        e.preventDefault();
        // @ts-ignore
        this.value = e.target.files;
    }
}
