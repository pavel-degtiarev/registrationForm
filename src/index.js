"use strict";

import "./index.scss";

import { FormState } from "./js/formState";
import { Validator } from "./js/validator";
import * as check from "./js/checks";

const formID = "regForm";
const submitButtonClass = "form_submit";

function submitCallback(data) {
  console.log("Данные формы отправлены", data);
}

// ключи – id input'ов из HTML, значения – функции-валидаторы этого поля
// валидатор на вход получает объект ValidityState и объект formState
export const fieldChecks = {
  firstName: check.name,
  lastName: check.name,
  email: check.email,
  pass: check.password,
  passRepeat: check.password,
  birthDate: check.birthDate,
};

const validator = new Validator(fieldChecks);
const formState = new FormState(formID, validator, submitButtonClass, submitCallback);
Object.keys(fieldChecks).forEach((id) => formState.addField(id));
