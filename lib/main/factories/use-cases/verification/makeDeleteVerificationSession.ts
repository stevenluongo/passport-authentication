import { FetchVerificationSessionByIdInterface } from '@application/interfaces/use-cases/verification/fetchVerificationSessionByIdInterface';
import { DeleteVerificationSession } from '@application/use-cases/verification/deleteVerificationSession';
import { VerificationRepository } from '@infra/db/mongodb/repositories/VerificationRepository';

export const makeDeleteVerificationSession =
  (): FetchVerificationSessionByIdInterface => {
    const verificationRepository = new VerificationRepository();
    return new DeleteVerificationSession(verificationRepository);
  };
