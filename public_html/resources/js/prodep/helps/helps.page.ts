import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class HelpsPage extends Vue {
    tableTitle = "A";
    apiResource = "prodep_helps";
    toolbar = new Set([]);
    
    fields = [
{ key: "name", label: "Nombre", sortable: true }
];
}
