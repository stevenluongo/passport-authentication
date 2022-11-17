import { BaseController } from '@infra/controllers/baseController';
import { UpdateUserController } from '@infra/http/controllers/user/updateUserController';
import { makeUpdateUser } from '@main/factories/use-cases/user/makeUpdateUser';
import { makeUpdateUserValidation } from './makeUpdateUserValidation';

export const makeUpdateUserController = (): BaseController => {
  const validation = makeUpdateUserValidation();
  const useCase = makeUpdateUser();
  return new UpdateUserController(useCase, validation);
};
