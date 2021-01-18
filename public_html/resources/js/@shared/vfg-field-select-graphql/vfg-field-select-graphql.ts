import Component from "vue-class-component";
import { Mixins } from 'vue-property-decorator';
import {GraphQLBuilder, GraphQLIndexResponse} from "../siip-table/GraphQL";
const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldGraphQLSelect extends Mixins(VueFormGenerator.abstractField) {
    [x: string]: any;
    options: { text: string, value: string }[] = [];
    isTouched: any = null;
    texts: any = {};

    mounted() {
        const allItems = new GraphQLBuilder(this.schema.query, [{sortable: true, key: this.schema.textKey}]);
        allItems.index('').then(this.loadItems);
        if (this.model.id) {
            const itemWantsToEdit = new GraphQLBuilder(this.schema.module, [{sortable: true, key: this.schema.model}]);
            itemWantsToEdit.find(this.model.id).then((response) => this.value = response[this.schema.model]);
        }
    }

    loadItems(response: GraphQLIndexResponse) {
      response.data.forEach((element: any) => {
        this.options.push({
            value: element['id'],
            text: element[this.schema.textKey]
        });
        this.texts[element['id']] = element[this.schema.textKey]
      })
    }

    handleBlur() {
       this.isTouched = true;
    }

    get idState() {
      return this.isTouched && !isNaN(this.value) && typeof Number(this.value) === 'number' && !!this.texts[this.value];
    }

}
