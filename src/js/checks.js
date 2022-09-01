// eslint-disable-next-line no-unused-vars
import { FIELD_ERROR, FIELD_OK } from "./global";

// валидатор на вход получает значение поля, объект ValidityState и объект formState

export function name(value, validity, state) {
  console.log("firstName", value, validity, state);
  return { result: FIELD_ERROR, message: "Очень страшная ошибка в firstName" };
}

export function email(value, validity, state) {
  console.log("email", value, validity, state);
  return { result: FIELD_ERROR, message: "Очень страшная ошибка в email" };
}

export function password(value, validity, state) {
  console.log("pass", value, validity, state);
  return { result: FIELD_ERROR, message: "Очень страшная ошибка в pass" };
}

export function birthDate(value, validity, state) {
  console.log("birthDate", value, validity, state);
  return { result: FIELD_ERROR, message: "Очень страшная ошибка в birthDate" };
}
