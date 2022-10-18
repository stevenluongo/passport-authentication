import { UserProps } from '../../../domain/entities/user';
import { UseCase } from './useCase';

export interface CreatePostInterface
  extends UseCase<
    CreatePostInterfaceNamespace.Request,
    CreatePostInterfaceNamespace.Response
  > {
  execute(
    postData: CreatePostInterfaceNamespace.Request
  ): Promise<CreatePostInterfaceNamespace.Response>;
}

export namespace CreatePostInterfaceNamespace {
  export type Request = Omit<UserProps, 'id' | 'createdAt'>;
  export type Response = string;
}
