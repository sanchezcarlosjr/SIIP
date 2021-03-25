import Vue from "vue";
import Component from "vue-class-component";
// @ts-ignore
import LineChart from "./chart/LineChart";
// @ts-ignore
import BarChart from "./chart/BarChart";

@Component({
    components: {
        LineChart,
        BarChart
    }
})
export default class AcademicBodyStatistics extends Vue {
    academicBodyStatistics = {
        total: 0,
        professorsWithSNIOrProdep: 0,
        professorsInAcademicBody: 0,
        ptcsAreNotAcademicBody: 0,
        academicBodyByGrade: {
            inTraining: [],
            inConsolidation: [],
            consolidated: []
        }
    };
    academicBodyByLevel = {
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
                    data: this.academicBodyStatistics.academicBodyByGrade.inTraining
                },
                {
                    label: 'En consolidación',
                    backgroundColor: '#dc8e00',
                    data: this.academicBodyStatistics.academicBodyByGrade.inConsolidation
                },
                {
                    label: 'Consolidados',
                    backgroundColor: '#f87979',
                    data: this.academicBodyStatistics.academicBodyByGrade.consolidated
                }
            ]
        },
    };
}
