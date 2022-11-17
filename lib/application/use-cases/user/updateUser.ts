import { UpdateUserRepository } from '@application/interfaces/repositories/user/updateUserRepository';
import {
  UpdateUserInterface,
  UpdateUserInterfaceNamespace,
} from '@application/interfaces/use-cases/user/updateUserInterface';

export class UpdateUser implements UpdateUserInterface {
  constructor(private readonly updateUserRepository: UpdateUserRepository) {}
  async execute(
    data: UpdateUserInterfaceNamespace.Request
  ): Promise<UpdateUserInterfaceNamespace.Response> {
    //logic goes here
    return this.updateUserRepository.updateUser(data);
  }
}
