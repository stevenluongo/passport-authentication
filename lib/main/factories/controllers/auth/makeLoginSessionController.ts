import { BaseController } from '../../../../infra/controllers/baseController';
import { LoginSessionController } from '../../../../infra/http/controllers/auth/loginSessionController';
import { makeLoginSession } from '../../use-cases/auth/makeLoginSession';
import { makeLoginSessionValidation } from './makeLoginSessionValidation';

export const makeLoginSessionController = (): BaseController => { 
  const validation = makeLoginSessionValidation();
  const useCase = makeLoginSession();
  return new LoginSessionController(useCase, validation);
};