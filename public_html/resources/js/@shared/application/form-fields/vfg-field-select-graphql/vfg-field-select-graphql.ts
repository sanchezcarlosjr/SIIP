import gql from 'graphql-tag';
import {Mixins, Component} from 'vue-property-decorator';

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
        },
        value: {
             skip: true,
             manual: true,
             result ({ data, loading }) {
                 if (!loading) {
                     this.value = data.academic_body[this.schema.model];
                     this.showFeedback(String(this.value));
                 }
             },
             query() {
                const query =  this.schema.model;
                return gql`
                    query getResourceById($id: ID) {
                        academic_body(id: $id) {
                             ${query}
                        }
                    }
                `
            },
            variables() {
                return {
                    id: this.model.id
                }
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
        if (this.model.id) {
            this.$apollo.queries.value.start();
        }
    }

    handleBlur() {
        this.isTouched = true;
    }

    showFeedback(id: string) {
        // @ts-ignore
        this.feedback = this.options.find((ob) => ob.value === id)?.text;
    }

}
