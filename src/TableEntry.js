import Button from "./Button"


export class TableEntry {
    constructor(car, onDelete, onClickTableElement) {
        this.car = car

        this.onClickTableElement = onClickTableElement

        this.onDelete = onDelete

    }

    render() {
        const tableRow = document.createElement("tr")
        const tableRowCell1 = document.createElement("td")
        const tableRowCell2 = document.createElement("td")
        const tableRowCell3 = document.createElement("td")
        const tableRowCell4 = document.createElement("td")

        tableRowCell1.innerText = this.car.brand
        tableRowCell2.innerText = this.car.model
        tableRowCell3.innerText = this.car.productionYear

        tableRowCell1.classList.add("align-middle")
        tableRowCell1.style.cursor = "pointer"
        // tableRowCell1.addEventListener("click", (event) => {
        //     event.target.innerText = this.onClickTableElement()
        // })

        tableRowCell2.classList.add("car__model", "align-middle")
        tableRowCell2.style.cursor = "pointer"
        // tableRowCell2.addEventListener("click", (event) => {
        //     event.target.innerText = this.onClickTableElement()
        // })

        tableRowCell3.classList.add("align-middle")
        tableRowCell3.style.cursor = "pointer"
        // tableRowCell3.addEventListener("click", (event) => {
        //     event.target.innerText = this.onClickTableElement()
        // })


        const deleteButton = new Button("", () => this.onDelete(), ['btn', 'btn-danger', "delete__button"])

        const deleteButtonRendered = deleteButton.render()
        deleteButtonRendered.innerHTML = `<i class="far fa-trash-alt"></i>`
        tableRowCell4.appendChild(deleteButtonRendered)


        tableRow.append(tableRowCell1, tableRowCell2, tableRowCell3, tableRowCell4)

        return tableRow
    }
}

export default TableEntry