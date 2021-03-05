import gql from 'graphql-tag';
import {Component, Mixins} from 'vue-property-decorator';

const VueFormGenerator = require('vue-form-generator');

@Component({
    apollo: {
        options: {
            query() {
                return gql`
                    query {
                        ${this.schema.query} {
                            data {
                                id
                                ${this.schema.textKey}
                            }
                        }
                    }
                `
            },
            update(data) {
                return data[this.schema.query].data.map(
                    (result: any) => {
                        return {
                            value: result.id,
                            text: result[this.schema.textKey]
                        }
                    });
            }
        }
    }
})
export default class VfgFieldGraphQLSelect extends Mixins(VueFormGenerator.abstractField) {
    [x: string]: any;

    options: { text: string, value: string }[] = [];
    isTouched: any = null;
    feedback = '';

    get idState() {
        return this.isTouched;
    }

    mounted() {
    }

    handleBlur() {
        this.isTouched = true;
    }

    showFeedback(id: string) {
        // @ts-ignore
        this.feedback = this.options.find((ob) => ob.value === id)?.text;
    }

}
