import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class LGACPage extends Vue {
    apiResource = new GraphqlResourceRepository('lgacs');
    spanishResourceName = 'LGAC'
    toolbar = new Set<string>([]);
    defaultCriteria = [{
        value: 'vigente',
        default: false
    },
        {
            value: 'no vigente',
            default: false
        }];
    fields = [
        { key: 'key', label: 'Clave', sortable: true },
        { key: 'name', label: 'Nombre', sortable: true },
        { key: 'description', label: 'Descripción', sortable: true },
    ];
}

