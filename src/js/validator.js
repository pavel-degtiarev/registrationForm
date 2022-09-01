export class Validator {
  validations = {};

  addCheck(fieldID, validation) {
    this.validations[fieldID] = validation;
  }

  check(id, validity, state) {
    return this.validations[id](validity, state);
  }
}
