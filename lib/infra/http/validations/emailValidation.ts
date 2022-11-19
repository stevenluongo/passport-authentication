import { validateEmail } from '@main/helpers/validateEmail';
import { InvalidEmailError } from '../errors/invalidEmailError';
import { Validation } from '../interfaces/validation';

export class EmailValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | null {
    //validate email
    if (!validateEmail(input[this.fieldName])) {
      return new InvalidEmailError();
    }
    return null;
  }
}
