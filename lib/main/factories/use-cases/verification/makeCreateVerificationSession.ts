import { CreateVerificationSessionInterface } from '@application/interfaces/use-cases/verification/createVerificationSessionInterface';
import { CreateVerificationSession } from '@application/use-cases/verification/createVerificationSession';
import { VerificationRepository } from '@infra/db/mongodb/repositories/VerificationRepository';

export const makeCreateVerificationSession = (): CreateVerificationSessionInterface => {
  const verificationRepository = new VerificationRepository();
  return new CreateVerificationSession(verificationRepository);
};
