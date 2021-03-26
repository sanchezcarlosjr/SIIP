import Vue from "vue";
import Component from "vue-class-component";
// @ts-ignore
import LineChart from "./chart/LineChart";
// @ts-ignore
import BarChart from "./chart/BarChart";
import gql from "graphql-tag";

@Component({
    components: {
        LineChart,
        BarChart
    },
    apollo: {
        statistics: {
            result({data, loading, networkStatus}) {
                if (!loading) {
                    this.academicBodyStatistics = {
                        ...data['academic_body_statistics']
                    };
                    this.setAcademicBodyByLevel(this.academicBodyStatistics);
                }
            },
            pollInterval: 8000,
            manual: true,
            query: gql`query {
                academic_body_statistics{
                    total
                    professorsWithSNIOrProdep
                    professorsInAcademicBody
                    ptcsAreNotAcademicBody
                    academicBodyByGrade {
                        inTraining
                        inConsolidation
                        consolidated
                    }
                }
            }`
        }
    }
})
export default class AcademicBodyStatistics extends Vue {
    academicBodyStatistics = {
        total: 0,
        professorsWithSNIOrProdep: 0,
        professorsInAcademicBody: 0,
        ptcsAreNotAcademicBody: 0
    };
    academicBodyByLevel = {};

    mounted() {
        this.$apollo.queries.statistics.start();
    }

    setAcademicBodyByLevel(data: any) {
        this.academicBodyByLevel = {
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            data: {
                labels: ['CA por grado de consolidación'],
                datasets: [
                    {
                        label: 'En formación',
                        backgroundColor: '#218838',
                        data: data['academicBodyByGrade']['inTraining']
                    },
                    {
                        label: 'En consolidación',
                        backgroundColor: '#dc8e00',
                        data: data['academicBodyByGrade']['inConsolidation']
                    },
                    {
                        label: 'Consolidados',
                        backgroundColor: '#f87979',
                        data: data['academicBodyByGrade']['consolidated']
                    }
                ]
            },
        };
    }
}
