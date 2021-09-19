export class Table {
    constructor(tableHeaderLabelValue = [], dataFields = [], tableClasses = [], onClick) {
        this.tableHeaderLabelValue = tableHeaderLabelValue
        this.dataFields = dataFields
        this.tableClasses = tableClasses
        this.onClick = onClick
    }

    render() {
        const table = document.createElement("table")
        const tableHeader = document.createElement("thead")
        const tableRow = document.createElement("tr")
        const tableBody = document.createElement("tbody")

        tableHeader.style.cursor = "pointer"


        if (Array.isArray(this.tableClasses)) {
            this.tableClasses.forEach(element => {
                table.classList.add(element)
            })
        }

        if (Array.isArray(this.tableHeaderLabelValue)) {
            this.tableHeaderLabelValue.forEach(element => {
                const tableHeaderElement = document.createElement("th")
                tableHeaderElement.setAttribute("data-sortable", "true")
                tableHeaderElement.innerText = element
                tableHeaderElement.dataset.field = element
                tableHeaderElement.setAttribute("scope", "col")
                tableHeaderElement.classList.add("pe-auto", "align-middle")

                tableRow.appendChild(tableHeaderElement)

            })
        }

        tableHeader.appendChild(tableRow)
        table.appendChild(tableHeader)
        table.appendChild(tableBody)

        table.setAttribute("id", "table")
        return table
    }
}

export default Table