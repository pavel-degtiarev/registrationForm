import { Field } from "./field";
import { FIELD_OK } from "./global";

export class FormState {
  state = {};
  fields = new Map();
  validator = null;
  commitButton = null;
  submitCallback = () => {};

  constructor(formID, validator, commitButtonClass, submitCallback) {
    this.fieldBlurHandler = this.fieldBlurHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.validator = validator;
    this.submitCallback = submitCallback;

    this.form = document.getElementById(formID);
    if (!this.form) throw new Error("Форма не найдена!");

    this.commitButton = this.form.querySelector(`.${commitButtonClass}`);
    if (!this.commitButton) throw new Error("Кнопка отправки формы не найдена!");
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

    this.buttonStateHandler();
  }

  buttonStateHandler() {
    const fieldStates = [...this.fields.values()].map((field) => field.state);

    if (fieldStates.every((state) => state === FIELD_OK)) {
      this.commitButton.classList.remove("disabled");
      this.form.addEventListener("submit", this.formSubmitHandler);
    } else {
      this.commitButton.classList.add("disabled");
      this.form.removeEventListener("submit", this.formSubmitHandler);
    }
  }

  formSubmitHandler(e) {
    e.preventDefault();
    this.submitCallback(this.state);
  }
}
