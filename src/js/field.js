import { FIELD_ERROR, FIELD_OK, FIELD_UNDEFINED } from "./global";

export class Field {
  state = FIELD_UNDEFINED;
  id = null;
  input = null;
  label = null;

  constructor(inputID) {
    this.input = document.querySelector(`#${inputID}`);
    if (!this.input) throw new Error(`Поле с ID:${inputID} не найдено!`);

    this.label = document.querySelector(`label[for=${inputID}]`);
    if (!this.label) throw new Error(`У поля с ID:${inputID} не найдена подпись!`);

    this.id = inputID;
  }

  setBlurHandler(handler) {
    this.input.addEventListener("blur", handler);
  }

  setState(result, message) {
    this.state = result;

    switch (true) {
      case this.state === FIELD_OK:
        this.input.classList.remove("field_invalid");
        this.label.dataset.err = "";
        break;

      case this.state === FIELD_ERROR:
        this.input.classList.add("field_invalid");
        this.label.dataset.err = message;
        break;
    }
  }
}
