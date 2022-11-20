import { DeleteVerificationSessionRepository } from '@application/interfaces/repositories/verification/deleteVerificationSessionRepository';
import {
  DeleteVerificationSessionInterface,
  DeleteVerificationSessionInterfaceNamespace,
} from '@application/interfaces/use-cases/verification/deleteVerificationSessionInterface';

export class DeleteVerificationSession
  implements DeleteVerificationSessionInterface
{
  constructor(
    private readonly deleteVerificationSessionRepository: DeleteVerificationSessionRepository
  ) {}

  async execute(
    _id: DeleteVerificationSessionInterfaceNamespace.Request
  ): Promise<DeleteVerificationSessionInterfaceNamespace.Response> {
    return this.deleteVerificationSessionRepository.deleteVerificationSession(
      _id
    );
  }
}
