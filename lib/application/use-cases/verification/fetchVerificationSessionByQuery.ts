import { FetchVerificationSessionByQueryRepository } from '@application/interfaces/repositories/verification/fetchVerificationSessionByQueryRepository';
import {
  CreateVerificationSessionInterfaceNamespace
} from '@application/interfaces/use-cases/verification/createVerificationSessionInterface';
import { FetchVerificationSessionByQueryInterface } from '@application/interfaces/use-cases/verification/fetchVerificationSessionByQueryInterface';

export class FetchVerificationSessionByQuery
  implements FetchVerificationSessionByQueryInterface
{
  constructor(
    private readonly createVerificationSessionRepository: FetchVerificationSessionByQueryRepository
  ) {}

  async execute(
    payload: CreateVerificationSessionInterfaceNamespace.Request
  ): Promise<CreateVerificationSessionInterfaceNamespace.Response> {
    //our logic here

    const { hash } = payload;

    return this.createVerificationSessionRepository.fetchVerificationSessionByQuery({
      hash,
    });
  }
}
