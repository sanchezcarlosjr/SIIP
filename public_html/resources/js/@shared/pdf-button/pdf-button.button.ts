import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from 'vue-property-decorator';

@Component
export default class PDFButton extends Vue {
    downloadASPDF() {
        this.$bvToast.toast(`Por favor espere`, {
            title: 'Iniciando descarga',
            autoHideDelay: 5000,
        })
        let doc = new jsPDF.jsPDF();
        doc.setFontSize(18)
        const date = new Date();
        doc.text(`UABC \t ${date.toISOString()}`, 14, 22)
        doc.setFontSize(11)
        doc.setTextColor(100)
        const pageSize = doc.internal.pageSize
        const totalPagesExp = '{total_pages_count_string}'
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
        const text = doc.splitTextToSize(`SISTEMA INSTITUCIONAL DE INDICADORES DE INVESTIGACION Y POSGRADO`, pageWidth - 35, {})
        doc.text(text, 14, 30)
        // @ts-ignore
        const res = doc.autoTableHtmlToJson(document.getElementById("main-table"));
        const columns = res.columns.slice(0, res.columns.length - 1);
        // @ts-ignore
        doc.autoTable(columns, res.data, {
            startY: 40,
            didDrawPage: (data: any) => {
                // Footer
                // @ts-ignore
                let str = 'Página ' + doc.internal.getNumberOfPages()
                if (typeof doc.putTotalPages === 'function') {
                    str = str + ' de ' + totalPagesExp
                }
                doc.setFontSize(10)

                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                const pageSize = doc.internal.pageSize
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                doc.text(str, data.settings.margin.left, pageHeight - 10)
            },
            headStyles: {
                fillColor: [19, 108, 15],
                fontSize: 14,
            }
        });
        doc.putTotalPages(totalPagesExp)
        doc.save(`siip-${date.toISOString()}.pdf`)
    }
}

