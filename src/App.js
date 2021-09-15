import Input from "./Input";
import Button from "./Button";
import { Label } from "./Label";
import InputGroup from "./InputGroup";
import Table from "./Table";

const DB_URL = "https://frontend--sandbox-default-rtdb.europe-west1.firebasedatabase.app/cars/.json"

export class App {

    constructor() {
        this.container = null
    }

    submitData() {
        const input1 = document.getElementById("brand")
        const input2 = document.getElementById("model")
        const input3 = document.getElementById("production-year")

        if (input1.value !== "") {
            //to check is string empty!!!
            return fetch(DB_URL, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "brand": input1.value,
                        "model": input2.value,
                        "production-year": input3.value
                    })
            })
        }
        else return
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

        const submitButton = new Button("DODAJ", () => this.submitData(), ['btn', 'btn-outline-success', "w-100"])

        const inputGroupElement4 = new InputGroup(["input-group", "mb-3"])
        const inputElement4 = new Input("Szukaj model", ['form-control'], "text", "filter")
        const filterButton = new Button("FILTRUJ", () => console.log("dziala"), ['btn', 'btn-info'])

        const table = new Table(['Marka pojazdu', 'Model pojazdu', 'Rok produkcji'], ['Marka pojazdu', 'Model pojazdu', 'Rok produkcji'], ['table', 'table-striped', 'table-dark', "table-hover"])

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
        inputGroupElement4Rendered.appendChild(inputElement4.render())
        inputGroupElement4Rendered.appendChild(filterButton.render())

        form.appendChild(inputGroupElement1Rendered)
        form.appendChild(inputGroupElement2Rendered)
        form.appendChild(inputGroupElement3Rendered)
        form.appendChild(submitButton.render())


        this.container.appendChild(form)
        this.container.appendChild(inputGroupElement4Rendered)
        this.container.appendChild(table.render())

        return this.container
    }
}

export default App