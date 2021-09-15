export class Button {
    constructor(label, onClick, classes) {
        this.label = label
        this.onClick = onClick
        this.classes = classes
    }

    render() {
        const btn = document.createElement("button")

        btn.innerText = this.label

        if (Array.isArray(this.classes)) {
            this.classes.forEach(element => {
                btn.classList.add(element)
            })
        }
        btn.addEventListener(
            'click',
            () => this.onClick()
        )

        return btn
    }
}

export default Button