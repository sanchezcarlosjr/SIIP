import {Component, Mixins, Watch} from 'vue-property-decorator';
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

    updated() {
      this.schema.datalist = this.options;
      this.schema.hint = this.options.find((ob) => ob.value === this.value)?.text || "";
    }

    @Watch("value")
    onValueChange(newValue:string) {
      this.search(newValue);
    }

    search(id: string) {
      if (id !== undefined) {
        this.$apollo.queries.options.refetch({
          filter: id
        });
      }
    }


}
