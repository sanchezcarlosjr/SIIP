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
    fields = [
        {key: 'name', label: '', sortable: true, editable: true},
        {key: 'prodep_key', label: '', sortable: true, editable: true},
        {key: 'active', label: '', sortable: true, editable: true},
        {key: 'lead_employee_id', label: '', sortable: true, editable: true},
        {key: 'uabc_areas_id', label: '', sortable: true},
        {key: 'prodep_area_id', label: '', sortable: true},
        {key: 'des_id', label: '', sortable: true},
        {key: 'discipline_id', label: '', sortable: true},
    ];
    model = {};
}
