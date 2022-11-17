import { BaseController } from '@infra/controllers/baseController';
import { FetchUserByIdController } from '@infra/http/controllers/user/fetchUserByIdController';
import { makeFetchUserById } from '@main/factories/use-cases/user/makeFetchUserById';
import { makeFetchUserByIdValidation } from './makeFetchUserByIdValidation';

export const makeFetchUserByIdController = (): BaseController => {
  const validation = makeFetchUserByIdValidation();
  const useCase = makeFetchUserById();
  return new FetchUserByIdController(useCase, validation);
};
