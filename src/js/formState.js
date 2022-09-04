import { FIELD_OK } from "./global";

export class FormState {
  form = null;
  state = {};
  fields = new Map();
  validator = null;
  submitButton = null;
  submitCallback = () => {};

  constructor(form, fields, validator, submitButton, submitCallback) {
    this.fieldBlurHandler = this.fieldBlurHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);

    this.form = form;
    this.validator = validator;
    this.submitButton = submitButton;
    this.submitCallback = submitCallback;

    // перебираем массив полей, на каждое поле навешиваем blurHandler
    // добавляем их в this.fields с ключом DOM-элементом <input>
    // заполняем объект состояния формы this.state начальными пустыми строками
    fields.forEach((field) => {
      field.setBlurHandler(this.fieldBlurHandler);
      this.fields.set(field.input, field);
      this.state[field.id] = "";
    });
  }

  fieldBlurHandler(e) {
    const input = e.target;

    // берем значение <input>, обновляем состояние формы и вызываем валидацию для этого поля
    input.value = input.value.trim();
    this.state[input.id] = input.value;
    const { result, message } = this.validator.check(input.id, input.validity, this.state);

    // по результатам валидации меняем состояние поля (ок или ошибка)
    const currentField = this.fields.get(input);
    currentField.setState(result, message);

    // проверяем, надо ли разблокировать кнопку (или наоборот, заблокировать)
    this.buttonStateHandler();
  }

  buttonStateHandler() {
    // массив состояний всех полей
    const fieldStates = [...this.fields.values()].map((field) => field.state);

    if (fieldStates.every((state) => state === FIELD_OK)) {
      this.submitButton.on();
      this.form.addEventListener("submit", this.formSubmitHandler);
    } else {
      this.submitButton.off();
      this.form.removeEventListener("submit", this.formSubmitHandler);
    }
  }

  formSubmitHandler(e) {
    e.preventDefault();
    this.submitCallback(this.state);
  }
}
