import { CreateUserInterfaceNamespace } from "../../interfaces/use-cases/createUserInterface";
import { FetchUserByIdRepository } from "../../interfaces/repositories/user/fetchUserByIdRepository";
import { FetchUserByIdInterface } from "../../interfaces/use-cases/user/fetchUserByIdInterface";

export class FetchUserById implements FetchUserByIdInterface {
  constructor(
    private readonly fetchUserByIdRepository: FetchUserByIdRepository
  ) {}
  async execute(
    data: CreateUserInterfaceNamespace.Request
  ): Promise<CreateUserInterfaceNamespace.Response> {
    return this.fetchUserByIdRepository.fetchUserById(data);
  }
}
