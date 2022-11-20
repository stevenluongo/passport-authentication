import { DeleteUserRepository } from '@application/interfaces/repositories/user/deleteUserRepository';
import {
  DeleteUserInterface,
  DeleteUserInterfaceNamespace,
} from '@application/interfaces/use-cases/user/deleteUserInterface';

export class DeleteUser implements DeleteUserInterface {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}
  async execute(
    _id: DeleteUserInterfaceNamespace.Request
  ): Promise<DeleteUserInterfaceNamespace.Response> {
    return this.deleteUserRepository.deleteUser(_id);
  }
}
