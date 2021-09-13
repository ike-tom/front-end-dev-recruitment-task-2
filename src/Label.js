export class Label {
    constructor(labelValue = "", classes = []) {
        this.labelValue = labelValue
        this.classes = classes
    }

    render() {
        const label = document.createElement("span")

        if (Array.isArray(this.classes)) {
            this.classes.forEach(element => {
                label.classList.add(element)
            })
        }
        label.innerText = this.labelValue

        return label
    }
}

export default Label