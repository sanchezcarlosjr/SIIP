
export class CSV {
    // @ts-ignore
    private csv: BlobPart;
    constructor(private filename: string) {
    }
    download() {
        let csvFile;
        let downloadLink: any;
        const BOM = "\uFEFF";
        const csvData = BOM + this.csv;
        csvFile = new Blob([csvData], {type: "text/csv"});
        downloadLink = document.createElement("a");
        downloadLink.download = this.filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    load() {
        const csv = [];
        const rows = document.querySelectorAll("table tr");
        for (let i = 0; i < rows.length; i++) {
            const row = [], cols = rows[i].querySelectorAll("td, th");
            for (let j = 0; j < cols.length; j++) { // @ts-ignore
                row.push(cols[j].innerText.replace(/\n\(.*\)/, ''));
            }
            csv.push(row.join(','));
        }
        this.csv = csv.join('\n');
    }
}
