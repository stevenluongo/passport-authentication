import { BaseController } from '../../../../infra/controllers/baseController';
import { DeleteUserController } from '../../../../infra/http/controllers/user/deleteUserController';
import { makeDeleteUser } from '../../use-cases/user/makeDeleteUser';
import { makeDeleteUserValidation } from './makeDeleteUserValidation';

export const makeDeleteUserController = (): BaseController => {
  const validation = makeDeleteUserValidation();
  const useCase = makeDeleteUser();
  return new DeleteUserController(useCase, validation);
};
