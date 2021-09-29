import Input from "./Input";
import Button from "./Button";
import Label from "./Label";
import InputGroup from "./InputGroup";
import Table from "./Table";
import TableEntry from "./TableEntry";
import { readAll, create, remove } from './api'

export class App {
    constructor(storageKey) {
        this.container = null
        this.storageKey = storageKey || 'cars'
        this.cars = []
        this.isLoading = true
        this.hasError = false
    }

    addToTheTable() {
        const input1 = document.getElementById("brand")
        const input2 = document.getElementById("model")
        const input3 = document.getElementById("production-year")
        if (input1.value !== "" && input2.value !== "" && input3.value !== "") {

            const tableRow = document.createElement("tr")

            const tdBrand = document.createElement("td")
            const tdModel = document.createElement("td")
            const tdYear = document.createElement("td")

            tdBrand.innerText = input1.value
            tdModel.innerText = input2.value
            tdYear.innerText = input3.value

            tableRow.appendChild(tdBrand)
            tableRow.appendChild(tdModel)
            tableRow.appendChild(tdYear)

            document.querySelector("tbody").appendChild(tableRow)
        }
        else return

    }
    renderCars() {
        if (!Array.isArray(this.cars)) return
        document.querySelector("tbody").innerHTML = ""

        this.cars.forEach((carData) => {
            const car = new TableEntry(
                carData,
                () => this.deleteTask(carData),
                () => console.log("open popup")
            )
            document.querySelector("tbody").appendChild(car.render())
        })
    }

    deleteTask(carData) {
        const carKey = carData.key

        this.setLoading(true)
        this.setError(false)

        return remove(this.storageKey, carKey)
            .then(() => this.loadCar())
            .catch(() => this.setError(true))
            .finally(() => this.setLoading(false))
    }

    addCarToTheTable() {
        const input1 = document.getElementById("brand")
        const input2 = document.getElementById("model")
        const input3 = document.getElementById("production-year")

        if (input1.value !== "" && input2.value !== "" && input3.value !== "") {
            this.addCar(input1.value, input2.value, input3.value)
        }
        else return
    }

    openPopup() {
        const changedName = prompt("Zmień nazwę")
        return changedName
    }

    sort() {
        console.log("sortowanie")
        const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent

        const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
        )(getCellValue(asc ? b : a, idx), getCellValue(asc ? a : b, idx))

        document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
            const table = th.closest('table')
            const tbody = table.querySelector('tbody')
            Array.from(tbody.querySelectorAll('tr'))
                .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                .forEach(tr => tbody.appendChild(tr))
        })))

    }

    filter() {
        const input = document.getElementById("filter")
        const filter = input.value.toUpperCase()
        const table = document.getElementById("table")
        const tr = table.getElementsByTagName("tr")

        for (let i = 1; i < tr.length; i++) {
            tr[i].style.display = "none"

            const td = tr[i].getElementsByClassName("car__model")
            for (var j = 0; j < td.length; j++) {
                const cell = tr[i].getElementsByClassName("car__model")[j]
                if (cell) {
                    if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = ""
                        break
                    }
                }
            }
        }
    }

    setLoading(newLoading) {
        this.isLoading = newLoading
        // this.render()
    }

    setError(newError) {
        this.hasError = newError
        // this.render()
    }

    addCar(brand, model, year) {
        const newCarData = {
            brand: brand,
            model: model,
            productionYear: year,
            createdAt: (new Date()).toISOString(),
        }
        this.setLoading(true)
        this.setError(false)

        return create(this.storageKey, newCarData)
            .then(() => this.loadCar())
    }

    loadCar() {
        this.setLoading(true)
        this.setError(false)
        return readAll(this.storageKey)
            .then((data) => {
                if (Array.isArray(data) || data === null) {
                    this.cars = data || []
                } else {
                    this.setError(true)
                }
                this.renderCars()
            })
            .catch(() => this.setError(true))
            .finally(() => this.setLoading(false))
    }

    render() {
        if (!this.container) {
            this.container = document.createElement('div')
        }
        this.container.innerHTML = ''

        this.container.classList.add("container-md")

        const form = document.createElement("form")

        const inputGroupElement1 = new InputGroup(["input-group", "mb-3"])
        const inputElement1 = new Input("Marka pojazdu", ['form-control', 'col'], "text", "true", "brand")
        const labelElement1 = new Label("Marka pojazdu", ['input-group-text', 'col'])

        const inputGroupElement2 = new InputGroup(["input-group", "mb-3"])
        const inputElement2 = new Input("Model pojazdu", ['form-control', 'col'], "text", "true", "model")
        const labelElement2 = new Label("Model pojazdu", ['input-group-text', 'col'])

        const inputGroupElement3 = new InputGroup(["input-group", "mb-3"])
        const inputElement3 = new Input("Rok produkcji", ['form-control', 'col'], "number", "true", "production-year")
        const labelElement3 = new Label("Rok produkcji", ['input-group-text', 'col'])

        const submitButton = new Button("DODAJ", () => {
            this.addCarToTheTable()
        }, ['btn', 'btn-outline-success', "w-100"])

        const inputGroupElement4 = new InputGroup(["input-group", "mb-3"])
        const inputElement4 = new Input("Szukaj model", ['form-control'], "text", "false", "filter")
        const filterButton = new Button("", () => this.filter(), ['btn', 'btn-info'])

        const table = new Table(['Marka pojazdu', 'Model pojazdu', 'Rok produkcji', "Usuń"], ['Marka pojazdu', 'Model pojazdu', 'Rok produkcji', "Usuń"], ['table', 'table-striped', 'thead-dark', "table-hover"], () => this.sort())

        const inputGroupElement1Rendered = inputGroupElement1.render()
        inputGroupElement1Rendered.appendChild(labelElement1.render())
        inputGroupElement1Rendered.appendChild(inputElement1.render())

        const inputGroupElement2Rendered = inputGroupElement2.render()
        inputGroupElement2Rendered.appendChild(labelElement2.render())
        inputGroupElement2Rendered.appendChild(inputElement2.render())

        const inputGroupElement3Rendered = inputGroupElement3.render()
        inputGroupElement3Rendered.appendChild(labelElement3.render())
        inputGroupElement3Rendered.appendChild(inputElement3.render())

        const inputGroupElement4Rendered = inputGroupElement4.render()

        const inputElement4Rendered = inputElement4.render()
        inputElement4Rendered.addEventListener("input", () => this.filter())
        inputGroupElement4Rendered.appendChild(inputElement4Rendered)
        const filterButtonRendered = filterButton.render()
        filterButtonRendered.innerHTML = `<i class="fas fa-filter"></i>`
        inputGroupElement4Rendered.appendChild(filterButtonRendered)

        form.appendChild(inputGroupElement1Rendered)
        form.appendChild(inputGroupElement2Rendered)
        form.appendChild(inputGroupElement3Rendered)
        form.appendChild(submitButton.render())

        form.addEventListener("click", function (event) {
            event.preventDefault();
        })

        this.container.appendChild(form)
        this.container.appendChild(inputGroupElement4Rendered)
        const tableRendered = table.render()
        this.container.appendChild(tableRendered)
        this.loadCar()

        return this.container
    }
}

export default App