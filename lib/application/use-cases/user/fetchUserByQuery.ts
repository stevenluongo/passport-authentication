import { FetchUserByQueryRepository } from '@application/interfaces/repositories/user/fetchUserByQueryRepository';
import {
  FetchUserByIdInterface,
  FetchUserByIdInterfaceNamespace,
} from '@application/interfaces/use-cases/user/fetchUserByIdInterface';

export class FetchUserByQuery implements FetchUserByIdInterface {
  constructor(
    private readonly fetchUserByIdRepository: FetchUserByQueryRepository
  ) {}
  async execute(
    data: FetchUserByIdInterfaceNamespace.Request
  ): Promise<FetchUserByIdInterfaceNamespace.Response> {
    return this.fetchUserByIdRepository.fetchUserByQuery(data);
  }
}
