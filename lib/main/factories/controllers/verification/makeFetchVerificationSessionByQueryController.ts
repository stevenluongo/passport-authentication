import { BaseController } from '@infra/controllers/baseController';
import { FetchVerificationSessionByQueryController } from '@infra/http/controllers/verification/fetchVerificationSessionByQueryController';
import { makeFetchVerificationSessionByQuery } from '@main/factories/use-cases/verification/makeFetchVerificationSessionByQuery';
import { makeFetchVerificationSessionByQueryValidation } from './makeFetchVerificationSessionByQueryValidation';

export const makeFetchVerificationSessionByQueryController =
  (): BaseController => {
    const validation = makeFetchVerificationSessionByQueryValidation();
    const useCase = makeFetchVerificationSessionByQuery();
    return new FetchVerificationSessionByQueryController(useCase, validation);
  };
