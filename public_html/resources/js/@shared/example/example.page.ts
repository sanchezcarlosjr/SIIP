import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ExamplePage extends Vue {
    tableTitle = '';
    apiResource = '';
    toolbar = new Set([]);
    schema = {};
    fields = [];
}
