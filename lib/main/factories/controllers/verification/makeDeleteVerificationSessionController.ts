import { BaseController } from '@infra/controllers/baseController';
import { DeleteVerificationSessionController } from '@infra/http/controllers/verification/deleteVerificationSessionController';
import { makeDeleteVerificationSession } from '@main/factories/use-cases/verification/makeDeleteVerificationSession';
import { makeDeleteVerificationSessionValidation } from './makeDeleteVerificationSessionValidation';

export const makeDeleteVerificationSessionController = (): BaseController => {
  const useCase = makeDeleteVerificationSession();
  const valiation = makeDeleteVerificationSessionValidation();
  return new DeleteVerificationSessionController(useCase, valiation);
};
