import { FetchVerificationSessionByIdRepository } from '@application/interfaces/repositories/verification/fetchVerificationSessionByIdRepository';
import {
  FetchVerificationSessionByIdInterface,
  FetchVerificationSessionByIdInterfaceNamespace,
} from '@application/interfaces/use-cases/verification/fetchVerificationSessionByIdInterface';

export class FetchVerificationSessionById
  implements FetchVerificationSessionByIdInterface
{
  constructor(
    private readonly fetchVerificationSessionByIdRepository: FetchVerificationSessionByIdRepository
  ) {}

  async execute(
    _id: FetchVerificationSessionByIdInterfaceNamespace.Request
  ): Promise<FetchVerificationSessionByIdInterfaceNamespace.Response> {
    return this.fetchVerificationSessionByIdRepository.fetchVerificationSessionById(
      _id
    );
  }
}
