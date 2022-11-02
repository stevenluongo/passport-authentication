import { Collection, ObjectId } from "mongodb";
import {
  CreateUserRepository,
  CreateUserRepositoryNamespace
} from "../../../../application/interfaces/repositories/user/createUserRepository";
import { DeleteUserRepositoryNamespace } from "../../../../application/interfaces/repositories/user/deleteUserRepository";
import { FetchUserByIdRepositoryNamespace } from "../../../../application/interfaces/repositories/user/fetchUserByIdRepository";
import { UpdateUserRepositoryNamespace } from "../../../../application/interfaces/repositories/user/updateUserRepository";
import { collections } from "../helpers/database.service";
import { objectIdToString } from "../helpers/mapper";

export class UserRepository implements CreateUserRepository {
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
    return objectIdToString(insertedId);
  }

  async fetchUserById(
    data: FetchUserByIdRepositoryNamespace.Request
  ): Promise<FetchUserByIdRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    const query = { _id: new ObjectId(data.id) };
    return await collection.findOne(query);
  }

  public async updateUser(
      data: UpdateUserRepositoryNamespace.Request
  ): Promise<UpdateUserRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    const { id, ...body} = data;
    const query = { _id: new ObjectId(id) };
    return await collection.updateOne(query, { $set: { ...body }});
  }

  public async deleteUser(data : DeleteUserRepositoryNamespace.Request) : Promise<DeleteUserRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    const query = { _id: new ObjectId(data.id) };
    return await collection.deleteOne(query);
  }
}
