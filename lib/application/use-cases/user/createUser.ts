import { CreateUserRepository } from '@application/interfaces/repositories/user/createUserRepository';
import {
  CreateUserInterface,
  CreateUserInterfaceNamespace,
} from '@application/interfaces/use-cases/user/createUserInterface';
import { generateHash } from '@main/helpers/hash';

export class CreateUser implements CreateUserInterface {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(
    payload: CreateUserInterfaceNamespace.Request
  ): Promise<CreateUserInterfaceNamespace.Response> {
    //extract password and user fields
    const { password, ...userFields } = payload;

    //generate salt and hash for the password
    const { salt, hash } = generateHash(password);

    //include new fields in the payload
    const userPayload = {
      ...userFields,
      salt,
      hash,
    };

    return this.createUserRepository.createUser(userPayload);
  }
}
