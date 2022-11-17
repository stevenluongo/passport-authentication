import { BaseController } from '@infra/controllers/baseController';
import { CreateUserController } from '@infra/http/controllers/user/createUserController';
import { makeCreateUser } from '@main/factories/use-cases/user/makeCreateUser';
import { makeCreateUserValidation } from './makeCreateUserValidation';

export const makeCreateUserController = (): BaseController => {
  const validation = makeCreateUserValidation();
  const useCase = makeCreateUser();
  return new CreateUserController(useCase, validation);
};
