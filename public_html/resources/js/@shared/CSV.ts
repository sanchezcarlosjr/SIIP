
export class CSV {
    // @ts-ignore
    private csv: BlobPart;
    constructor(private filename: string) {
    }
    download() {
        var csvFile;
        var downloadLink;
        var BOM = "\uFEFF";
        var csvData = BOM + this.csv;
        csvFile = new Blob([csvData], {type: "text/csv"});
        downloadLink = document.createElement("a");
        downloadLink.download = this.filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    load() {
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length-1; j++)
                { // @ts-ignore
                    row.push(cols[j].innerText.replace(/\n\(.*\)/, ''));
                }
            csv.push(row.join(','));
        }
        this.csv = csv.join('\n');
    }
}
