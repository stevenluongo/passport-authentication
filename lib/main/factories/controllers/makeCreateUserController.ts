import { BaseController } from '../../../infra/controllers/baseController';
import { CreateUserController } from '../../../infra/http/controllers/createUserController';
import { makeCreateUser } from '../use-cases/makeCreateUser';
import { makeCreateUserValidation } from './makeCreateUserValidation';

export const makeCreateUserController = (): BaseController => {
  const validation = makeCreateUserValidation();
  const useCase = makeCreateUser();
  return new CreateUserController(validation, useCase);
};
