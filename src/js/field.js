import { FIELD_ERROR, FIELD_OK, FIELD_UNDEFINED } from "./global";

export class Field {
  state = FIELD_UNDEFINED;
  field = null;
  label = null;

  constructor(fieldID) {
    this.field = document.querySelector(`#${fieldID}`);
    if (!this.field) throw new Error(`Поле с ID:${fieldID} не найдено!`);

    this.label = document.querySelector(`label[for=${fieldID}]`);
    if (!this.label) throw new Error(`У поля с ID:${fieldID} не найдена подпись!`);
  }

  setBlurHandler(handler) {
    this.field.addEventListener("blur", handler);
  }

  setState(result, message) {
    this.state = result;

    switch (true) {
      case this.state === FIELD_OK:
        this.field.classList.remove("field_invalid");
        this.label.dataset.err = "";
        break;

      case this.state === FIELD_ERROR:
        this.field.classList.add("field_invalid");
        this.label.dataset.err = message;
        break;
    }
  }
}
