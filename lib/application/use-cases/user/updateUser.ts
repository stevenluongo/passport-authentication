import {
  UpdateUserInterface,
  UpdateUserInterfaceNamespace,
} from '../../interfaces/use-cases/user/updateUserInterface';
import { UpdateUserRepository } from '../../interfaces/repositories/user/updateUserRepository';

export class UpdateUser implements UpdateUserInterface {
  constructor(private readonly updateUserRepository: UpdateUserRepository) {}
  async execute(
    data: UpdateUserInterfaceNamespace.Request
  ): Promise<UpdateUserInterfaceNamespace.Response> {
    //logic goes here
    return this.updateUserRepository.updateUser(data);
  }
}
