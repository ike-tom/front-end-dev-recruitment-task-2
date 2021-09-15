export class Input {
    constructor(inputPlaceholder = "", classes = [], type = "text", isRequired = "false", id = "") {
        this.inputPlaceholder = inputPlaceholder
        this.classes = classes
        this.type = type
        this.isRequired = isRequired
        this.id = id
    }
    render() {
        const input = document.createElement("input")

        input.type = this.type
        input.placeholder = this.inputPlaceholder
        input.setAttribute("id", this.id)

        if (this.isRequired === "true") {
            input.setAttribute("required", "")
        }

        if (Array.isArray(this.classes)) {
            this.classes.forEach(element => {
                input.classList.add(element)
            })
        }

        return input
    }
}

export default Input