import { BaseController } from '@infra/controllers/baseController';
import { FetchUserByQueryController } from '@infra/http/controllers/user/fetchUserByQueryController';
import { makeFetchUserByQuery } from '@main/factories/use-cases/user/makeFetchUserByQuery';

export const makeFetchUserByQueryController = (): BaseController => {
  const useCase = makeFetchUserByQuery();
  return new FetchUserByQueryController(useCase);
};
