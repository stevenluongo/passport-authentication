import { BaseController } from '@infra/controllers/baseController';
import { FetchVerificationSessionByQueryController } from '@infra/http/controllers/verification/fetchVerificationSessionByQueryController';
import { makeFetchVerificationSessionByQuery } from '@main/factories/use-cases/verification/makeFetchVerificationSessionByQuery';

export const makeFetchVerificationSessionByQueryController =
  (): BaseController => {
    const useCase = makeFetchVerificationSessionByQuery();
    return new FetchVerificationSessionByQueryController(useCase);
  };
