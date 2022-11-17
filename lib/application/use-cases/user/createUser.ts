import { CreateUserRepository } from '@application/interfaces/repositories/user/createUserRepository';
import {
  CreateUserInterface,
  CreateUserInterfaceNamespace,
} from '@application/interfaces/use-cases/user/createUserInterface';
import { generateHash } from '@main/helpers/generateHash';

export class CreateUser implements CreateUserInterface {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(
    userData: CreateUserInterfaceNamespace.Request
  ): Promise<CreateUserInterfaceNamespace.Response> {
    //our logic here to create a new user
    const { password, ...userBody } = userData;

    //generate salt and hash for the password
    const { salt, hash } = generateHash(password);

    //include new fields in the payload
    const userPayload = {
      ...userBody,
      salt,
      hash,
    };

    return this.createUserRepository.createUser({
      ...userPayload,
    });
  }
}
