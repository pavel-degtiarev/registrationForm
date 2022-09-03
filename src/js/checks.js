import { FIELD_ERROR, FIELD_OK } from "./global";

// ValidityState {
//   badInput,
//   customError,
//   patternMismatch,
//   rangeOverflow,
//   rangeUnderflow,
//   stepMismatch,
//   tooLong,
//   tooShort,
//   typeMismatch,
//   valid,
//   valueMissing,
// }

// валидатор на вход получает объект ValidityState и объект formState

// =============================================

export function name(validity) {

  const validityMatrix = {
    patternMismatch: "Разрешены символы кириллицы, латиницы и дефис.",
    tooLong: "Слишком много текста. Допускается не более 255 символов.",
    valueMissing: "Поле обязательно должно быть заполнено.",
  };

  return validityCheck(validityMatrix, validity);
}

// =============================================

export function email(validity) {

  const validityMatrix = {
    typeMismatch: "Неправильный формат email.",
    patternMismatch: "Неправильный формат email.",
    tooLong: "Слишком длинный адрес. Допускается не более 255 символов.",
    valueMissing: "Поле обязательно должно быть заполнено.",
  };

  return validityCheck(validityMatrix, validity);
}

// =============================================

export function password(validity, state) {

  const validityMatrix = {
    tooLong: "Слишком длинный пароль. Допускается не более 255 символов.",
    tooShort: "Слишком короткий пароль. Должно быть не менее 8 символов.",
  };

  const check = validityCheck(validityMatrix, validity);
  if (check.result === FIELD_ERROR) return check;

  if (state.pass && state.passRepeat && state.pass !== state.passRepeat)
    return {
      result: FIELD_ERROR,
      message: "Введенные пароли не совпадают.",
    };

  return { result: FIELD_OK, message: "" };
}

// =============================================

export function birthDate(validity, state) {

  const validityMatrix = {
    badInput: "Неправильно введена дата",
  };

  const check = validityCheck(validityMatrix, validity);
  if (check.result === FIELD_ERROR) return check;

  const [year, month, day] = state.birthDate.split("-");
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day)).valueOf();
  const majorityDate = new Date(Number(year) + 18, Number(month) - 1, Number(day)).valueOf();
  const today = new Date().setHours(0, 0, 0);

  if (today < birthDate)
    return { result: FIELD_ERROR, message: "Серьезно? Вы из будущего?" };

  if (today < majorityDate)
    return { result: FIELD_ERROR, message: "Регистрация разрешена только совершеннолетним." };

  return { result: FIELD_OK, message: "" };
}

// =============================================

function validityCheck(matrix, validity) {
  for (const test of Object.keys(matrix)) {
    if (validity[test])
      return {
        result: FIELD_ERROR,
        message: matrix[test],
      };
  }

  return { result: FIELD_OK, message: "" };
}
