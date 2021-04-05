import {Component, Mixins} from 'vue-property-decorator';
import {adapt} from "../../../infraestructure/communication/graphql/graphql-adapter";
import {OptionsApolloRepository} from "./OptionsApolloRepository";
import {GraphqlResourceRepository} from "../../../infraestructure/communication/graphql/graphql-resource-repository";

const VueFormGenerator = require('vue-form-generator');

@Component({
    apollo: {
        options: adapt(new OptionsApolloRepository())
    }
})
export default class VfgFieldGraphQLSelect extends Mixins(VueFormGenerator.abstractField) {
    [x: string]: any;

    options: { text: string, value: string }[] = [];
    optionsFinder = typeof this.schema.query === 'string' ? GraphqlResourceRepository.createDefaultRepository(this.schema.query) : this.schema.query;
    isTouched: any = null;
    text = '';

    get idState() {
        return this.isTouched;
    }

    handleBlur() {
        const element = document.getElementById(this.schema.model.concat('select') + this.text)
        // @ts-ignore
        this.value = element.getAttribute('data-value');
        this.isTouched = true;
    }

}
