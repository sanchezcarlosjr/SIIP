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
    feedback = '';

    get idState() {
        return this.isTouched;
    }

    handleBlur() {
        this.isTouched = true;
    }

    showFeedback(id: string) {
        // @ts-ignore
        this.feedback = this.options.find((ob) => ob.value === id)?.text;
    }

}
