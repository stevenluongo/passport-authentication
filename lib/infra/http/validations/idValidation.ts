import { ObjectId } from 'mongodb';
import { InvalidIdError } from '../errors/invalidIdError';
import { Validation } from '../interfaces/validation';

export class IdValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | null {
    //ensure id is valid
    if (!new ObjectId(input[this.fieldName])) {
      return new InvalidIdError();
    }
    return null;
  }
}
