import { Field } from "./field";

export class FormState {
  state = {};
  fields = new Map();
  validator = null;
  commitButton = null;

  constructor(formID, validator, commitButtonClass) {
    this.form = document.getElementById(formID);
    if (!this.form) throw new Error("Форма не найдена!");

    this.commitButton = this.form.querySelector(`.${commitButtonClass}`);
    if (!this.commitButton) throw new Error("Кнопка отправки формы не найдена!");

    this.validator = validator;

    this.fieldBlurHandler = this.fieldBlurHandler.bind(this);
  }

  addField(id) {
    const DOMfield = this.form.querySelector(`#${id}`);
    if (!DOMfield) throw new Error(`Поле с ID:${id} не найдено!`);

    const fieldObj = new Field(DOMfield, this.fieldBlurHandler);
    this.fields.set(DOMfield, fieldObj);

    this.state[id] = "";
  }

  fieldBlurHandler(e) {
    const input = e.target;

    this.state[input.id] = input.value;
    const { result, message } = this.validator.check(input.id, input.validity, this.state);

    const currentField = this.fields.get(input);
    currentField.setState(result, message);

    console.log(result, message);
  }
}
