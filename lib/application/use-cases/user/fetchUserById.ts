import { FetchUserByIdRepository } from '@application/interfaces/repositories/user/fetchUserByIdRepository';
import {
  FetchUserByIdInterface,
  FetchUserByIdInterfaceNamespace,
} from '@application/interfaces/use-cases/user/fetchUserByIdInterface';

export class FetchUserById implements FetchUserByIdInterface {
  constructor(
    private readonly fetchUserByIdRepository: FetchUserByIdRepository
  ) {}
  async execute(
    _id: FetchUserByIdInterfaceNamespace.Request
  ): Promise<FetchUserByIdInterfaceNamespace.Response> {
    return this.fetchUserByIdRepository.fetchUserById(_id);
  }
}
