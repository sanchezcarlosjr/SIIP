import Vue from "vue"
import Component from "vue-class-component"
import {CSV} from "../CSV";

@Component
export default class PDFButton extends Vue {
    downloadAsCSV() {
        this.$bvToast.toast(`Por favor espere`, {
            title: 'Iniciando descarga',
            autoHideDelay: 5000,
        })
        const date = new Date();
        const csv = new CSV(`usuarios-siip-${date.toISOString()}.csv`);
        csv.load();
        csv.download();
    }
}

