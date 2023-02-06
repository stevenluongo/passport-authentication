import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface FetchAllUsersServiceInterface {
  fetchAllUsers(): Promise<FetchAllUsersServiceInterfaceNamespace.Response>;
}

export namespace FetchAllUsersServiceInterfaceNamespace {
  export type Response = HttpResponse;
}
