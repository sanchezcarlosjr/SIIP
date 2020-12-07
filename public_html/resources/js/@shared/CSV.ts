
export class CSV {
    // @ts-ignore
    private csv: BlobPart;
    constructor(private filename: string) {
    }
    download() {
        var csvFile;
        var downloadLink;

        // CSV file
        csvFile = new Blob([this.csv], {type: "text/csv"});

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = this.filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }
    load() {
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length-1; j++)
                { // @ts-ignore
                    row.push(`"${cols[j].innerText}"`);
                }
            csv.push(row.join(','));
        }
        this.csv = csv.join('\n');
    }
}
