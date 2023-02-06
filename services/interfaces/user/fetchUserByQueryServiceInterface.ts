import { UserProps } from '@domain/entities/user';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface FetchUserByQueryServiceInterface {
  fetchUserByQuery(
    payload: FetchUserByQueryServiceInterfaceNamespace.Request
  ): Promise<FetchUserByQueryServiceInterfaceNamespace.Response>;
}

export namespace FetchUserByQueryServiceInterfaceNamespace {
  export type Request = { body: Omit<UserProps, '_id' | 'salt' | 'hash'> };
  export type Response = HttpResponse;
}
