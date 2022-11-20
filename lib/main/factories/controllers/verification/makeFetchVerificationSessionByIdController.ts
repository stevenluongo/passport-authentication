import { BaseController } from '@infra/controllers/baseController';
import { FetchVerificationSessionByIdController } from '@infra/http/controllers/verification/fetchVerificationSessionByIdController';
import { makeFetchVerificationSessionById } from '@main/factories/use-cases/verification/makeFetchVerificationSessionById';
import { makeFetchVerificationSessionByIdValidation } from './makeFetchVerificationSessionByIdValidation';

export const makeFetchVerificationSessionByIdController =
  (): BaseController => {
    const useCase = makeFetchVerificationSessionById();
    const valiation = makeFetchVerificationSessionByIdValidation();
    return new FetchVerificationSessionByIdController(useCase, valiation);
  };
