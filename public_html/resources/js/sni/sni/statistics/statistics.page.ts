import Vue from "vue";
import Component from "vue-class-component";
// @ts-ignore
import LineChart from "./chart/LineChart";
// @ts-ignore
import BarChart from "./chart/BarChart";
import gql from "graphql-tag";
import {Prop} from "vue-property-decorator";
import GraphQLResourceRepository from "../../../@shared/infraestructure/communication/graphql/test";

@Component({
    components: {
        BarChart
    },
    apollo: {
        statistics: {
            result({data, loading, networkStatus}) {
                if (!loading) {
                    this.setAcademicBodyByLevel(data["sni_statistics"]);
                }
            },
            pollInterval: 20000,
            manual: true,
            query: gql`query($to: String, $from: String, $filter: [String]) {
                sni_statistics(to: $to, from: $from, filter: $filter) {
                    periods
                    postgraduates
                    undergraduates
                }
            }`,
            variables(): any {
                return {
                    to: this.to,
                    from: this.from,
                    filter: ["postgraduates","undergraduates"]
                }
            }
        }
    }
})
export default class SniStatistics extends Vue {
    @Prop() filters!: {name: string, value: string}[];
    from = "";
    to = "";
    periods:{text: string, value: string}[] = [];
    constructor() {
        super();
        const date = new Date();
        let actualYear = date.getFullYear();
        const finishedYear = actualYear - 6;
        const period = (date.getMonth() + 1 > 6) ? "2" : "1";
        this.to = `${actualYear}-${period}`;
        this.from = `${finishedYear}-${period}`;
        while (actualYear >= finishedYear) {
            this.periods.push({text: `${actualYear}-2`, value: `${actualYear}-2`});
            this.periods.push({text: `${actualYear}-1`, value: `${actualYear}-1`});
            actualYear--;
        }
    }

    sniByLevel = {};

    mounted() {
        this.$apollo.queries.statistics.start();
    }

    async changeFrom() {
        await this.$apollo.queries.statistics.refetch({
            from: this.from
        });
    }

    async changeTo() {
        await this.$apollo.queries.statistics.refetch({
            to: this.to
        });
    }

    setAcademicBodyByLevel(data: {periods: string[], postgraduates: number[], undergraduates: number[]}) {
        this.sniByLevel = {
            options: {
                tooltips: {
                    mode: 'x',
                    callbacks: {
                        footer: function(tooltipItems: any, data: any) {
                            let total = tooltipItems.reduce((a: number, e: any) => a + parseInt(e.yLabel), 0);
                            return 'Total: ' + total;
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            data: {
                labels: data.periods,
                datasets: [
                    {
                        label: 'Licenciatura',
                        backgroundColor: '#218838',
                        data: data.undergraduates,
                        stack: 'Stack 0',
                    },
                    {
                        label: 'Posgrado',
                        backgroundColor: '#dc8e00',
                        data: data.postgraduates,
                        stack: 'Stack 0',
                    }
                ]
            },
        };
    }
}
