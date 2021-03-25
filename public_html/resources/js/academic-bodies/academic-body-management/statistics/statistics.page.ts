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
                    data: [20, 20]
                },
                {
                    label: 'En consolidación',
                    backgroundColor: '#dc8e00',
                    data: [100, 20]
                },
                {
                    label: 'Consolidados',
                    backgroundColor: '#f87979',
                    data: [10, 20]
                }
            ]
        },
    };
}
