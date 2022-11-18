import { FetchVerificationSessionByQueryInterface } from '@application/interfaces/use-cases/verification/fetchVerificationSessionByQueryInterface';
import { VerificationRepository } from '@infra/db/mongodb/repositories/VerificationRepository';
import { FetchVerificationSessionByQuery } from '../../../../application/use-cases/verification/fetchVerificationSessionByQuery';

export const makeFetchVerificationSessionByQuery = (): FetchVerificationSessionByQueryInterface => {
  const verificationRepository = new VerificationRepository();
  return new FetchVerificationSessionByQuery(verificationRepository);
};
