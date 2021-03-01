import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class CollaboratorsPage extends Vue {
    apiResource = new GraphqlResourceRepository('collaborators');
    spanishResourceName = 'Colaboradores'
    toolbar = new Set<string>([]);
    fields = [
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'academic_body.name', label: 'Cuerpo académico', sortable: true}
    ];
}
