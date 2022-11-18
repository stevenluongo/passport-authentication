import { CreateUserInterface } from '@application/interfaces/use-cases/user/createUserInterface';
import { CreateVerificationSession } from '@application/use-cases/verification/createVerificationSession';
import { VerificationRepository } from '@infra/db/mongodb/repositories/VerificationRepository';

export const makeCreateVerificationSession = (): CreateUserInterface => {
  const verificationRepository = new VerificationRepository();
  return new CreateVerificationSession(verificationRepository);
};
