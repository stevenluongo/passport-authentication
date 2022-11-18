import {
  CreateVerificationSessionRepository,
  CreateVerificationSessionRepositoryNamespace
} from '@application/interfaces/repositories/verification/createVerificationSessionRepository';
import {
  FetchVerificationSessionByIdRepository,
  FetchVerificationSessionByIdRepositoryNamespace
} from '@application/interfaces/repositories/verification/fetchVerificationSessionByIdRepository';
import { FetchVerificationSessionByQueryRepository, FetchVerificationSessionByQueryRepositoryNamespace } from '@application/interfaces/repositories/verification/fetchVerificationSessionByQueryRepository';
import { Collection, ObjectId } from 'mongodb';
import { collections } from '../helpers/database.service';

export class VerificationRepository
  implements
    CreateVerificationSessionRepository,
    FetchVerificationSessionByIdRepository,
    FetchVerificationSessionByQueryRepository
{
  static async getCollection(): Promise<Collection> {
    return collections.verification;
  }

  async createVerificationSession(
    payload: CreateVerificationSessionRepositoryNamespace.Request
  ): Promise<CreateVerificationSessionRepositoryNamespace.Response> {
    const collection = await VerificationRepository.getCollection();
    const { insertedId } = await collection.insertOne({
      ...payload,
      createdAt: new Date(),
    });
    return this.fetchVerificationSessionById(insertedId);
  }

  async fetchVerificationSessionById(
    id: FetchVerificationSessionByIdRepositoryNamespace.Request
  ): Promise<FetchVerificationSessionByIdRepositoryNamespace.Response> {
    const collection = await VerificationRepository.getCollection();
    const query = { _id: new ObjectId(id) };
    return await collection.findOne(query);
  }

  async fetchVerificationSessionByQuery(
    query: FetchVerificationSessionByQueryRepositoryNamespace.Request
  ): Promise<FetchVerificationSessionByQueryRepositoryNamespace.Response> {
    const collection = await VerificationRepository.getCollection();
    return await collection
      .find(query)
      .toArray();
  }
}
