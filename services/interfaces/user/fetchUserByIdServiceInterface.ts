import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface FetchUserByIdServiceInterface {
  fetchUserById(
    payload: FetchUserByIdServiceInterfaceNamespace.Request
  ): Promise<FetchUserByIdServiceInterfaceNamespace.Response>;
}

export namespace FetchUserByIdServiceInterfaceNamespace {
  export type Request = { id: string };
  export type Response = HttpResponse;
}
