export class InputGroup {
    constructor(classes = []) {
        this.classes = classes
    }

    render() {
        const container = document.createElement("div")

        if (Array.isArray(this.classes)) {
            this.classes.forEach(element => {
                container.classList.add(element)
            })
        }
        return container
    }
}

export default InputGroup