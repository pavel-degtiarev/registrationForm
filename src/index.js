"use strict";

import "./index.scss";

import { FormState } from "./js/formState";
import { Validator } from "./js/validator";
import { Field } from "./js/field";
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

const fields = Object.keys(fieldChecks).map((id) => new Field(id));

const validator = new Validator(fieldChecks);
// eslint-disable-next-line no-unused-vars
const formState = new FormState(formID, fields, validator, submitButtonClass, submitCallback);
