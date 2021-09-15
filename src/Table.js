export class Table {
    constructor(tableHeaderLabelValue = [], dataFields = [], tableClasses = []) {
        this.tableHeaderLabelValue = tableHeaderLabelValue
        this.dataFields = dataFields
        this.tableClasses = tableClasses
    }

    render() {
        const table = document.createElement("table")
        const tableHeader = document.createElement("thead")
        const tableRow = document.createElement("tr")


        if (Array.isArray(this.tableClasses)) {
            this.tableClasses.forEach(element => {
                table.classList.add(element)
            })
        }

        if (Array.isArray(this.tableHeaderLabelValue)) {
            this.tableHeaderLabelValue.forEach(element => {
                const tableHeaderElement = document.createElement("th")
                tableHeaderElement.innerText = element
                tableHeaderElement.dataset.field = element
                tableRow.appendChild(tableHeaderElement)
            })
        }

        tableHeader.appendChild(tableRow)
        table.appendChild(tableHeader)

        return table
    }
}

export default Table