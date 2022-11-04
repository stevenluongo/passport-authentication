import { FetchUserByIdRepository } from '../../interfaces/repositories/user/fetchUserByIdRepository';
import {
  FetchUserByIdInterface,
  FetchUserByIdInterfaceNamespace
} from '../../interfaces/use-cases/user/fetchUserByIdInterface';

export class FetchUserById implements FetchUserByIdInterface {
  constructor(
    private readonly fetchUserByIdRepository: FetchUserByIdRepository
  ) {}
  async execute(
    data: FetchUserByIdInterfaceNamespace.Request
  ): Promise<FetchUserByIdInterfaceNamespace.Response> {
    return this.fetchUserByIdRepository.fetchUserById(data);
  }
}
