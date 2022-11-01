import { Collection, ObjectId } from "mongodb";
import {
  CreateUserRepository,
  CreateUserRepositoryNamespace,
} from "../../../../application/interfaces/repositories/createUserRepository";
import { collections } from "../helpers/database.service";
import { objectIdToString } from "../helpers/mapper";
import { FetchUserByIdRepositoryNamespace } from "../../../../application/interfaces/repositories/user/fetchUserByIdRepository";

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
}
