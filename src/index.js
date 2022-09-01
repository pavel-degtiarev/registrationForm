"use strict";

import "./index.scss";

import { FormState } from "./js/formState";
import { Validator } from "./js/validator";
import * as check from "./js/checks";

const formID = "regForm";

// ключи – id input'ов из HTML, значения – функции-валидаторы этого поля
// валидатор на вход получает значение поля, объект ValidityState и объект formState
export const fieldChecks = {
  firstName: check.name,
  lastName: check.name,
  email: check.email,
  pass: check.password,
  passRepeat: check.password,
  birthDate: check.birthDate,
};

const formState = new FormState(formID, new Validator());

Object.keys(fieldChecks).forEach((id) => {
  formState.addField(id, fieldChecks[id]);
});
