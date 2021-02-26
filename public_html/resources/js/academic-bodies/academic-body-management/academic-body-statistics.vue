<template>
    <b-container>
        <b-row class="text-center">
            <b-col>
                <p>Cuerpos Académicos
                    <b-badge>4</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>Profesores con SNI o PRODEP
                    <b-badge>4</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>Profesores en CA
                    <b-badge>2</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>PTC que no están en CA
                    <b-badge>3</b-badge>
                </p>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col>
                <bar-chart :chart-data="academicBodyByLevel.data" :options="academicBodyByLevel.options"></bar-chart>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import LineChart from "./chart/LineChart";
import BarChart from "./chart/BarChart";

export default {
    components: {
        LineChart,
        BarChart
    },
    name: "academic-body-statistics",
    data() {
        return {
            academicBodyByLevel: {
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
            },
        }
    },
}
</script>
