export class SubmitButton {
  button = null;

  constructor(className) {
    this.button = document.querySelector(`.${className}`);
    if (!this.button) throw new Error("Кнопка отправки формы не найдена!");
  }

  on() {
    this.button.classList.remove("disabled");
  }

  off() {
    this.button.classList.add("disabled");
  }
}
