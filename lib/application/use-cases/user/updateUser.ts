import { UpdateUserRepository } from '@application/interfaces/repositories/user/updateUserRepository';
import {
  UpdateUserInterface,
  UpdateUserInterfaceNamespace,
} from '@application/interfaces/use-cases/user/updateUserInterface';

export class UpdateUser implements UpdateUserInterface {
  constructor(private readonly updateUserRepository: UpdateUserRepository) {}
  async execute(
    payload: UpdateUserInterfaceNamespace.Request
  ): Promise<UpdateUserInterfaceNamespace.Response> {
    return this.updateUserRepository.updateUser(payload);
  }
}
