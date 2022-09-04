export class Validator {
  validations = {};

  // validations - объект у которого ключи - id input'ов из HTML,
  // значения - функции-валидаторы этого поля
  constructor(validations) {
    this.validations = validations;
  }

  check(id, validity, state) {
    return this.validations[id](validity, state);
  }
}
