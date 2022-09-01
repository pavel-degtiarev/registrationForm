export class Validator {
  validations = {};

  addCheck(fieldID, validation) {
    this.validations[fieldID] = validation;
  }

  check(id, value, validity, state) {
    return this.validations[id](value, validity, state);
  }
}
