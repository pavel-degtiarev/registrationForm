import { FIELD_ERROR, FIELD_OK, FIELD_UNDEFINED } from "./global";

export class Field {
  state = FIELD_UNDEFINED;
  field = null;
  label = null;

  constructor(field, callback) {
    this.field = field;
    this.label = document.querySelector(`[for=${this.field.id}]`);
    this.field.addEventListener("blur", callback);
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
