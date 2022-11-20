import {
  CreateVerificationSessionRepository,
  CreateVerificationSessionRepositoryNamespace,
} from '@application/interfaces/repositories/verification/createVerificationSessionRepository';
import { DeleteVerificationSessionRepository } from '@application/interfaces/repositories/verification/deleteVerificationSessionRepository';
import {
  FetchVerificationSessionByIdRepository,
  FetchVerificationSessionByIdRepositoryNamespace,
} from '@application/interfaces/repositories/verification/fetchVerificationSessionByIdRepository';
import {
  FetchVerificationSessionByQueryRepository,
  FetchVerificationSessionByQueryRepositoryNamespace,
} from '@application/interfaces/repositories/verification/fetchVerificationSessionByQueryRepository';
import { DeleteVerificationSessionInterfaceNamespace } from '@application/interfaces/use-cases/verification/deleteVerificationSessionInterface';
import { Collection, ObjectId } from 'mongodb';
import { collections } from '../helpers/database.service';

export class VerificationRepository
  implements
    CreateVerificationSessionRepository,
    FetchVerificationSessionByIdRepository,
    FetchVerificationSessionByQueryRepository,
    DeleteVerificationSessionRepository
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
    return await this.fetchVerificationSessionById(insertedId.toString());
  }

  async fetchVerificationSessionById(
    _id: FetchVerificationSessionByIdRepositoryNamespace.Request
  ): Promise<FetchVerificationSessionByIdRepositoryNamespace.Response> {
    const collection = await VerificationRepository.getCollection();
    const query = { _id: new ObjectId(_id) };
    return await collection.findOne(query);
  }

  async fetchVerificationSessionByQuery(
    query: FetchVerificationSessionByQueryRepositoryNamespace.Request
  ): Promise<FetchVerificationSessionByQueryRepositoryNamespace.Response> {
    const collection = await VerificationRepository.getCollection();
    return await collection.find(query).toArray();
  }

  public async deleteVerificationSession(
    _id: DeleteVerificationSessionInterfaceNamespace.Request
  ): Promise<DeleteVerificationSessionInterfaceNamespace.Response> {
    const collection = await VerificationRepository.getCollection();
    const query = { _id: new ObjectId(_id) };
    return await collection.deleteOne(query);
  }
}
