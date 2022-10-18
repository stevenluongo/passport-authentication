import { generateHash } from '../../helpers';
import { CreatePostRepository } from '../interfaces/repositories/createPostRepository';
import {
  CreatePostInterface,
  CreatePostInterfaceNamespace,
} from '../interfaces/use-cases/createPostInteface';

export class CreatePost implements CreatePostInterface {
  constructor(private readonly createPostRepository: CreatePostRepository) {}

  async execute(
    userData: CreatePostInterfaceNamespace.Request
  ): Promise<CreatePostInterfaceNamespace.Response> {
    //our logic here to create a new user
    const { password, ...userBody } = userData;

    //generate salt and hash for the password
    const { salt, hash } = generateHash(password);

    //include new fields in the payload
    const userPayload = {
      ...userBody,
      salt,
      hash,
    };

    return this.createPostRepository.createPost({
      ...userPayload,
    });
  }
}
