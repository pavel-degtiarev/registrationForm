import { Field } from "./field";

export class FormState {
  state = {};
  fields = new Map();

  constructor(formID, validator) {
    this.form = document.getElementById(formID);
    if (!this.form) throw new Error("Форма не найдена!");

    this.validator = validator;
    this.fieldBlurHandler = this.fieldBlurHandler.bind(this);
  }

  addField(id, check) {
    const DOMfield = document.getElementById(id);
    if (!DOMfield) throw new Error(`Поле с ID:${id} не найдено!`);

    const fieldObj = new Field(DOMfield, this.fieldBlurHandler);
    this.fields.set(DOMfield, fieldObj);

    this.validator.addCheck(id, check);
    this.state[id] = "";
  }

  fieldBlurHandler(e) {
    const { result, message } = this.validator.check(
      e.target.id,
      e.target.value,
      e.target.validity,
      this.state
    );
    const currentField = this.fields.get(e.target);
    currentField.setState(result, message);
    console.log(result, message);
  }
}
