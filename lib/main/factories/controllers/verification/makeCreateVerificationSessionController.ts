import { ValidationController } from '@infra/controllers/validationController';
import { CreateVerificationSessionController } from '@infra/http/controllers/verification/createVerificationSessionController';
import { makeCreateVerificationSession } from '@main/factories/use-cases/verification/makeCreateVerificationSession';
import { makeCreateVerificationSessionValidation } from './makeCreateVerificationSessionValidation';

export const makeCreateVerificationSessionController =
  (): ValidationController => {
    const validation = makeCreateVerificationSessionValidation();
    const useCase = makeCreateVerificationSession();
    return new CreateVerificationSessionController(useCase, validation);
  };
