import { BaseController } from '../../../../infra/controllers/baseController';
import { makeUpdateUserValidation } from './makeUpdateUserValidation';
import { makeUpdateUser } from '../../use-cases/user/makeUpdateUser';
import { UpdateUserController } from '../../../../infra/http/controllers/user/updateUserController';

export const makeUpdateUserController = (): BaseController => {
  const validation = makeUpdateUserValidation();
  const useCase = makeUpdateUser();
  return new UpdateUserController(useCase, validation);
};
