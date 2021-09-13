export class Input {
    constructor(inputPlaceholder = "", classes = [], type = "text") {
        this.inputPlaceholder = inputPlaceholder
        this.classes = classes
        this.type = type
    }
    render() {
        const input = document.createElement("input")

        input.type = this.type
        input.placeholder = this.inputPlaceholder

        if (Array.isArray(this.classes)) {
            this.classes.forEach(element => {
                input.classList.add(element)
            })
        }

        return input
    }
}

export default Input