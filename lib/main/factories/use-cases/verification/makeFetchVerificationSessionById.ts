import { FetchVerificationSessionByIdInterface } from '@application/interfaces/use-cases/verification/fetchVerificationSessionByIdInterface';
import { FetchVerificationSessionById } from '@application/use-cases/verification/fetchVerificationSessionById';
import { VerificationRepository } from '@infra/db/mongodb/repositories/VerificationRepository';

export const makeFetchVerificationSessionById =
  (): FetchVerificationSessionByIdInterface => {
    const verificationRepository = new VerificationRepository();
    return new FetchVerificationSessionById(verificationRepository);
  };
