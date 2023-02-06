import { UserProps } from '@domain/entities/user';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface UpdateUserServiceInterface {
  updateUser(
    payload: UpdateUserServiceInterfaceNamespace.Request
  ): Promise<UpdateUserServiceInterfaceNamespace.Response>;
}

export namespace UpdateUserServiceInterfaceNamespace {
  export type Request = {
    body: Omit<UserProps, '_id' | 'salt' | 'hash'>;
    id: string;
  };
  export type Response = HttpResponse;
}
