import { BaseController } from '../../../../infra/controllers/baseController';
import { makeFetchUserByIdValidation } from './makeFetchUserByIdValidation';
import { makeFetchUserById } from '../../use-cases/user/makeFetchUserById';
import { FetchUserByIdController } from '../../../../infra/http/controllers/user/fetchUserByIdController';

export const makeFetchUserByIdController = (): BaseController => {
  const validation = makeFetchUserByIdValidation();
  const useCase = makeFetchUserById();
  return new FetchUserByIdController(useCase, validation);
};
