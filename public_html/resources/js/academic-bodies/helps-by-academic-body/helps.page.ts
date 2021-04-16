import Vue from "vue"
import Component from "vue-class-component"
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";

@Component
export default class HelpsPage extends Vue {
    apiResource = GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'helps');
    spanishResourceName = 'apoyo'
    toolbar = new Set(['add', 'edit']);
    fields = [
        {key: 'type', label: 'Tipo', sortable: true},
        {key: 'date', label: 'Fecha', sortable: true},
        {key: 'amount', label: 'Monto', sortable: true},
        {key: 'benefited_employee.name', label: 'Beneficiario', sortable: true},
        {key: 'academic_body.leader.academic_unit.name', label: 'Unidad académica', sortable: true},
        {key: 'academic_body.leader.academic_unit.campus', label: 'Campus', sortable: true}
    ];
    schema = {
        fieldsToFind: [
            {
                type: 'select',
                label: 'Tipo de apoyo',
                model: 'type',
                values: [
                    'Estancias cortas',
                    'Apoyo a publicación',
                    'Convocatoria redes',
                    'Convocatoria fortalecimiento de CA',
                    'Becas posdoctorado'
                ]
            },
            {
                type: 'calendar',
                label: 'Fecha',
                model: 'date'
            },
            {
                type: 'input',
                inputType: 'number',
                label: 'Monto',
                model: 'amount'
            },
            {
                type: 'graphql-select-id',
                label: 'Empleado beneficiado',
                model: "benefited_employee_id",
                query: GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'employees'),
                textKey: 'name'
            },
            {
                type: "link",
                label: "Liberación",
                model: "release_url",
                visible: (model: { release_url: string }) => !!model?.release_url
            },
            {
                type: "link",
                label: "Reporte",
                model: "report_url",
                visible: (model: { report_url: string }) => !!model?.report_url
            },
            {
                type: "upload2",
                label: 'Nueva liberación',
                ignoreResponseField: true,
                model: 'release'
            },
            {
                type: "upload2",
                label: 'Nuevo reporte',
                ignoreResponseField: true,
                model: 'report'
            }
        ],
        fields: [
            {
                type: 'select',
                label: 'Tipo de apoyo',
                model: 'type',
                values: [
                    'Estancias cortas',
                    'Apoyo a publicación',
                    'Convocatoria redes',
                    'Convocatoria fortalecimiento de CA',
                    'Becas posdoctorado'
                ]
            },
            {
                type: 'calendar',
                label: 'Fecha',
                model: 'date'
            },
            {
                type: 'input',
                inputType: 'number',
                label: 'Monto',
                model: 'amount'
            },
            {
                type: 'graphql-select',
                label: 'Empleado beneficiado',
                model: "benefited_employee_id",
                query: GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'employees'),
                textKey: 'name'
            },
            {
                type: "upload2",
                label: 'Liberación',
                model: 'release'
            },
            {
                type: "upload2",
                label: 'Reporte',
                model: 'report'
            }
        ]
    };
}

