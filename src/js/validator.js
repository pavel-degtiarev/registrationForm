export class Validator {
  validations = {};

  constructor(validations) {
    this.validations = validations;
  }

  check(id, validity, state) {
    return this.validations[id](validity, state);
  }
}
