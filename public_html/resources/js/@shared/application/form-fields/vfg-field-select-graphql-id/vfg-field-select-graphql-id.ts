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
export default class VfgFieldGraphQLIdSelect extends Mixins(VueFormGenerator.abstractField) {
    [x: string]: any;

    options: { text: string; value: string; }[] = [];
    optionsFinder = typeof this.schema.query === 'string' ? GraphqlResourceRepository.createDefaultRepository(this.schema.query) : this.schema.query;
    isTouched: any = null;
    feedback = '';

    get idState() {
        return this.isTouched;
    }

    updated() {
        this.feedback = this.options.find((ob) => ob.value == this.value)?.text || "";
    }

    handleBlur() {
        this.isTouched = true;
    }

    search(id: string) {
        if (!id) {
            return;
        }
        this.$apollo.queries.options.refetch({
            filter: id
        });
        this.feedback = this.options.find((ob) => ob.value === id)?.text || "";
    }


}
