import { BaseController } from '../../../../infra/controllers/baseController';
import {makeFetchUserByQuery} from "../../use-cases/user/makeFetchUserByQuery";
import {FetchUserByQueryController} from "../../../../infra/http/controllers/user/fetchUserByQueryController";

export const makeFetchUserByQueryController = (): BaseController => {
    const useCase = makeFetchUserByQuery();
    return new FetchUserByQueryController(useCase);
};
