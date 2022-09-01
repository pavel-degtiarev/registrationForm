// eslint-disable-next-line no-unused-vars
import { FIELD_ERROR, FIELD_OK } from "./global";

// {
//   badInput: false;
//   customError: false;
//   patternMismatch: false;
//   rangeOverflow: false;
//   rangeUnderflow: false;
//   stepMismatch: false;
//   tooLong: false;
//   tooShort: false;
//   typeMismatch: false;
//   valid: false;
//   valueMissing: true;
// }

// валидатор на вход получает объект ValidityState и объект formState

// =============================================

export function name(validity, state) {
  console.log("firstName", validity, state);

  switch (true) {
    case validity.patternMismatch:
      return {
        result: FIELD_ERROR,
        message: "Разрешены символы кириллицы, латиницы и дефис.",
      };
    case validity.tooLong:
      return {
        result: FIELD_ERROR,
        message: "Слишком много текста. Допускается не более 255 символов.",
      };
    case validity.valueMissing:
      return {
        result: FIELD_ERROR,
        message: "Поле обязательно должно быть заполнено.",
      };
  }

  return { result: FIELD_OK, message: "" };
}

// =============================================

export function email(validity, state) {
  console.log("email", validity, state);

  switch (true) {
    case validity.typeMismatch:
      return {
        result: FIELD_ERROR,
        message: "Неправильный формат email.",
      };
    case validity.tooLong:
      return {
        result: FIELD_ERROR,
        message: "Слишком длинный адрес. Допускается не более 255 символов.",
      };
    case validity.valueMissing:
      return {
        result: FIELD_ERROR,
        message: "Поле обязательно должно быть заполнено.",
      };
  }

  return { result: FIELD_OK, message: "" };
}

// =============================================

export function password(validity, state) {
  console.log("pass", validity, state);

  switch (true) {
    case validity.tooLong:
      return {
        result: FIELD_ERROR,
        message: "Слишком длинный пароль. Допускается не более 255 символов.",
      };
    case validity.tooShort:
      return {
        result: FIELD_ERROR,
        message: "Слишком короткий пароль. Должно быть не менее 8 символов.",
      };
    case state.pass && state.passRepeat && state.pass !== state.passRepeat:
      return {
        result: FIELD_ERROR,
        message: "Введенные пароли не совпадают.",
      };
  }

  return { result: FIELD_OK, message: "" };
}

// =============================================

export function birthDate(validity, state) {
  console.log("birthDate", validity, state);
  return { result: FIELD_ERROR, message: "Очень страшная ошибка в birthDate" };
}
