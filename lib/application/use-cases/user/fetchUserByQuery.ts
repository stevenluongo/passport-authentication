import {
    FetchUserByIdInterface,
    FetchUserByIdInterfaceNamespace
} from '../../interfaces/use-cases/user/fetchUserByIdInterface';
import {FetchUserByQueryRepository} from "../../interfaces/repositories/user/fetchUserByQueryRepository";

export class FetchUserByQuery implements FetchUserByIdInterface {
    constructor(
        private readonly fetchUserByIdRepository: FetchUserByQueryRepository
    ) {}
    async execute(
        data: FetchUserByIdInterfaceNamespace.Request
    ): Promise<FetchUserByIdInterfaceNamespace.Response> {
        return this.fetchUserByIdRepository.fetchUserByQuery(data);
    }
}
