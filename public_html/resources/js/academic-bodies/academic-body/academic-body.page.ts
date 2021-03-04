import Component from "vue-class-component";
import AcademicBodyManagementPage from "../academic-body-management/academic-body-management.page";
import {adapt} from "../../@shared/infraestructure/communication/graphql/graphql-adapter";
import {GraphqlResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-finder-repository";

@Component({
    apollo: {
        model: adapt()
    }
})
export default class AcademicBodyPage extends AcademicBodyManagementPage {
    resource = GraphqlResourceFinderRepository.createDefaultFinder('academic_body');
    // @ts-ignore
    fields = [
        {key: 'name', label: '', sortable: true, editable: true},
        {key: 'prodep_key', label: '', sortable: true, editable: true},
        {key: 'active', label: '', sortable: true, editable: true},
        {key: 'lead_employee_id', label: '', sortable: true, editable: true},
        {key: 'prodep_area_id', label: '', sortable: true},
        {key: 'des_id', label: '', sortable: true},
        {key: 'discipline', label: '', sortable: true},
    ];
    model = {
        __typename: undefined
    };

    save() {
        delete this.model.__typename;
        return this.$apollo.mutate({
            mutation: this.resource.edit,
            variables: {
                data: {
                    ...this.model
                }
            }
        }).then(() =>
            this.$bvToast.toast(`Su operación fue exitosa`, {
                title: 'Operación exitosa',
                variant: 'success',
                solid: true
            })
        );
    }
}
