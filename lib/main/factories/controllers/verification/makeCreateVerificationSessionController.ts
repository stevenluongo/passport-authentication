import { BaseController } from '@infra/controllers/baseController';
import { CreateVerificationSessionController } from '@infra/http/controllers/verification/createVerificationSessionController';
import { makeCreateVerificationSession } from '@main/factories/use-cases/verification/makeCreateVerificationSession';
import { makeCreateVerificationSessionValidation } from './makeCreateVerificationSessionValidation';

export const makeCreateVerificationSessionController =
  (): BaseController => {
    const validation = makeCreateVerificationSessionValidation();
    const useCase = makeCreateVerificationSession();
    return new CreateVerificationSessionController(useCase, validation);
  };
