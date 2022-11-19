export class InvalidIdError extends Error {
  constructor() {
    super(
      'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer.'
    );
    this.name = 'InvalidIdError';
  }
}
