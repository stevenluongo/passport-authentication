import { UpdateUserInterface } from "../../../../application/interfaces/use-cases/user/updateUserInterface";
import { DeleteUser } from "../../../../application/use-cases/user/deleteUser";
import { UserRepository } from "../../../../infra/db/mongodb/repositories/UserRepository";

export const makeDeleteUser = (): UpdateUserInterface => {
    const userRepository = new UserRepository();
    return new DeleteUser(userRepository);
};
