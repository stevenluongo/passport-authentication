import { Collection } from 'mongodb';
import {
  CreateUserRepository,
  CreateUserRepositoryNamespace
} from '../../../../application/interfaces/repositories/createPostRepository';
import { collections } from '../helpers/database.service';
import { objectIdToString } from '../helpers/mapper';

export class UserRepository implements CreateUserRepository {
  static async getCollection(): Promise<Collection> {
    return collections.users;
  }

  async createPost(
    postData: CreateUserRepositoryNamespace.Request
  ): Promise<CreateUserRepositoryNamespace.Response> {
    const collection = await UserRepository.getCollection();
    const { insertedId } = await collection.insertOne({
      ...postData,
      createdAt: new Date(),
    });
    return objectIdToString(insertedId);
  }
}
