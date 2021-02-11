import Vue from "vue"
import Component from "vue-class-component"
import {CSV} from "./CSV";

@Component
export default class PDFButton extends Vue {
    downloadAsCSV(message = `Por favor espere`) {
        this.$bvToast.toast(message, {
            title: 'Iniciando descarga',
            autoHideDelay: 5000,
        });
        const date = new Date();
        const csv = new CSV(`siip-${date.toISOString()}.csv`);
        csv.load();
        csv.download();
    }
}

