import { Collection } from 'mongodb';
import {
  CreatePostRepository,
  CreatePostRepositoryNamespace,
} from '../../../../application/interfaces/repositories/createPostRepository';
import { collections } from '../helpers/database.service';
import { objectIdToString } from '../helpers/mapper';

export class PostRepository implements CreatePostRepository {
  static async getCollection(): Promise<Collection> {
    return collections.users;
  }

  async createPost(
    postData: CreatePostRepositoryNamespace.Request
  ): Promise<CreatePostRepositoryNamespace.Response> {
    const collection = await PostRepository.getCollection();
    const { insertedId } = await collection.insertOne({
      ...postData,
      createdAt: new Date(),
    });
    return objectIdToString(insertedId);
  }
}
