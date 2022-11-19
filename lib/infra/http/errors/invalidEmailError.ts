export class InvalidEmailError extends Error {
  constructor() {
    super('The email address you provided is invalid.');
    this.name = 'InvalidEmailError';
  }
}
