import {
  CreateUserRepository,
  CreateUserRepositoryNamespace,
} from '@application/interfaces/repositories/user/createUserRepository';
import {
  DeleteUserRepository,
  DeleteUserRepositoryNamespace,
} from '@application/interfaces/repositories/user/deleteUserRepository';
import {
  FetchUserByIdRepository,
  FetchUserByIdRepositoryNamespace,
} from '@application/interfaces/repositories/user/fetchUserByIdRepository';
import {
  FetchUserByQueryRepository,
  FetchUserByQueryRepositoryNamespace,
} from '@application/interfaces/repositories/user/fetchUserByQueryRepository';
import {
  UpdateUserRepository,
  UpdateUserRepositoryNamespace,
} from '@application/interfaces/repositories/user/updateUserRepository';
import { Collection, ObjectId } from 'mongodb';
import { collections } from '../helpers/database.service';

export class UserRepository
  implements
    CreateUserRepository,
    FetchUserByIdRepository,
    FetchUserByQueryRepository,
    UpdateUserRepository,
    DeleteUserRepository
{
  static async getCollection(): Promise<Collection> {
    return collections.users;
  }

  async createUser(
    postData: CreateUserRepositoryNamespace.Request
  ): Promise<CreateUserRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    const { insertedId } = await collection.insertOne({
      ...postData,
      createdAt: new Date(),
    });
    return await this.fetchUserById(insertedId.toString());
  }

  async fetchUserById(
    id: FetchUserByIdRepositoryNamespace.Request
  ): Promise<FetchUserByIdRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    const query = { _id: new ObjectId(id) };
    return await collection.findOne(query, {
      projection: { salt: 0, hash: 0 },
    });
  }

  async fetchUserByQuery(
    query: FetchUserByQueryRepositoryNamespace.Request
  ): Promise<FetchUserByQueryRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    return await collection
      .find(query, {
        projection: { salt: 0, hash: 0 },
      })
      .toArray();
  }

  async fetchLoginUser(
    query: FetchUserByQueryRepositoryNamespace.Request
  ): Promise<FetchUserByQueryRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    return await collection.find(query).toArray();
  }

  public async updateUser(
    payload: UpdateUserRepositoryNamespace.Request
  ): Promise<UpdateUserRepositoryNamespace.Response> {
    const { _id, filter } = payload;
    const collection = await UserRepository.getCollection();
    const query = { _id: new ObjectId(_id) };
    return await collection.updateOne(query, { $set: { ...filter } });
  }

  public async deleteUser(
    id: DeleteUserRepositoryNamespace.Request
  ): Promise<DeleteUserRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    const query = { _id: new ObjectId(id) };
    return await collection.deleteOne(query);
  }
}
