import { FetchVerificationSessionByQueryRepository } from '@application/interfaces/repositories/verification/fetchVerificationSessionByQueryRepository';
import {
  FetchVerificationSessionByQueryInterface,
  FetchVerificationSessionByQueryInterfaceNamespace,
} from '@application/interfaces/use-cases/verification/fetchVerificationSessionByQueryInterface';

export class FetchVerificationSessionByQuery
  implements FetchVerificationSessionByQueryInterface
{
  constructor(
    private readonly fetchVerificationSessionByQueryRepository: FetchVerificationSessionByQueryRepository
  ) {}

  async execute(
    payload: FetchVerificationSessionByQueryInterfaceNamespace.Request
  ): Promise<FetchVerificationSessionByQueryInterfaceNamespace.Response> {
    return this.fetchVerificationSessionByQueryRepository.fetchVerificationSessionByQuery(
      payload
    );
  }
}
