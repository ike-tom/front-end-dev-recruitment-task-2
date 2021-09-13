import Input from "./Input";
import Button from "./Button";
import { Label } from "./Label";
import InputGroup from "./InputGroup";

export class App {

    constructor() {
        this.container = null
    }

    render() {
        if (!this.container) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = ''

        this.container.classList.add("container-md")

        const inputGroupElement1 = new InputGroup(["input-group", "mb-3"])
        const inputElement1 = new Input("Marka pojazdu", ['form-control', 'col'], "text")
        const labelElement1 = new Label("Marka pojazdu", ['input-group-text', 'col'])

        const inputGroupElement2 = new InputGroup(["input-group", "mb-3"])
        const inputElement2 = new Input("Model pojazdu", ['form-control', 'col'], "text")
        const labelElement2 = new Label("Model pojazdu", ['input-group-text', 'col'])

        const inputGroupElement3 = new InputGroup(["input-group", "mb-3"])
        const inputElement3 = new Input("Rok produkcji", ['form-control', 'col'], "text")
        const labelElement3 = new Label("Rok produkcji", ['input-group-text', 'col'])

        const submitButton = new Button("DODAJ", console.log, ['btn', 'btn-outline-success', "w-100"])

        const inputGroupElement4 = new InputGroup(["input-group", "mb-3"])
        const inputElement4 = new Input("Szukaj model", ['form-control'], "text")
        const filterButton = new Button("FILTRUJ", console.log, ['btn', 'btn-info'])

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


        this.container.appendChild(inputGroupElement1Rendered)
        this.container.appendChild(inputGroupElement2Rendered)
        this.container.appendChild(inputGroupElement3Rendered)
        this.container.appendChild(submitButton.render())
        this.container.appendChild(inputGroupElement4Rendered)

        return this.container
    }
}

export default App