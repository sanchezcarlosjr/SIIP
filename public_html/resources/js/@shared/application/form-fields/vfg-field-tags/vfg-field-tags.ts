import {Component, Mixins} from 'vue-property-decorator';
import {adapt} from "../../../infraestructure/communication/graphql/graphql-adapter";
import {OptionsApolloRepository} from "./OptionsApolloRepository";
import {GraphqlResourceRepository} from "../../../infraestructure/communication/graphql/graphql-resource-repository";
import gql from "graphql-tag";

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
    search = "";

    mounted() {
        this.value = [];
    }

    get idState() {
        return this.isTouched;
    }

    handleBlur() {
        this.search = "";
    }

    addTag2() {
        this.search  = "";
    }

}
