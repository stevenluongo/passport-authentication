import { DeleteUserRepository } from "../../interfaces/repositories/user/deleteUserRepository";
import { DeleteUserInterface, DeleteUserInterfaceNamespace } from "../../interfaces/use-cases/user/deleteUserInterface";

export class DeleteUser implements DeleteUserInterface {
    constructor(
        private readonly deleteUserRepository: DeleteUserRepository
    ) {}
    async execute(
        data: DeleteUserInterfaceNamespace.Request
    ): Promise<DeleteUserInterfaceNamespace.Response> {
        //logic goes here
        return this.deleteUserRepository.deleteUser(data);
    }
}
