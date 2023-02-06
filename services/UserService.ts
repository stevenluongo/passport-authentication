import { BaseService } from './BaseService';
import {
  CreateUserServiceInterface,
  CreateUserServiceInterfaceNamespace,
} from './interfaces/user/createUserServiceInterface';
import {
  DeleteUserServiceInterface,
  DeleteUserServiceInterfaceNamespace,
} from './interfaces/user/deleteUserServiceInterface';
import {
  FetchAllUsersServiceInterface,
  FetchAllUsersServiceInterfaceNamespace,
} from './interfaces/user/fetchAllUsersServiceInterface';
import {
  FetchUserByIdServiceInterface,
  FetchUserByIdServiceInterfaceNamespace,
} from './interfaces/user/fetchUserByIdServiceInterface';
import {
  FetchUserByQueryServiceInterface,
  FetchUserByQueryServiceInterfaceNamespace,
} from './interfaces/user/fetchUserByQueryServiceInterface';
import {
  UpdateUserServiceInterface,
  UpdateUserServiceInterfaceNamespace,
} from './interfaces/user/updateUserServiceInterface';

export class UserService
  extends BaseService
  implements
    CreateUserServiceInterface,
    FetchUserByIdServiceInterface,
    FetchUserByQueryServiceInterface,
    DeleteUserServiceInterface,
    UpdateUserServiceInterface,
    FetchAllUsersServiceInterface
{
  public async fetchAllUsers(): Promise<FetchAllUsersServiceInterfaceNamespace.Response> {
    return await this.GET({ path: '/auth/user' });
  }

  public async createUser(
    payload: CreateUserServiceInterfaceNamespace.Request
  ): Promise<CreateUserServiceInterfaceNamespace.Response> {
    const { body } = payload!;
    return await this.POST({
      path: '/auth/user',
      body,
    });
  }

  public async fetchUserByQuery(
    payload: FetchUserByQueryServiceInterfaceNamespace.Request
  ): Promise<FetchUserByQueryServiceInterfaceNamespace.Response> {
    const { body } = payload!;
    return await this.PUT({
      path: '/auth/user',
      body,
    });
  }

  public async fetchUserById(
    payload: FetchUserByIdServiceInterfaceNamespace.Request
  ): Promise<FetchUserByIdServiceInterfaceNamespace.Response> {
    const { id } = payload!;
    return await this.GET({
      path: `/auth/user/${id}`,
    });
  }

  public async updateUser(
    payload: UpdateUserServiceInterfaceNamespace.Request
  ): Promise<UpdateUserServiceInterfaceNamespace.Response> {
    const { body, id } = payload!;
    return await this.PUT({
      path: `/auth/user/${id}`,
      body,
    });
  }

  public async deleteUser(
    payload: DeleteUserServiceInterfaceNamespace.Request
  ): Promise<DeleteUserServiceInterfaceNamespace.Response> {
    const { id } = payload!;
    return await this.DELETE({
      path: `/auth/user/${id}`,
    });
  }
}
