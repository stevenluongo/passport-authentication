import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface FetchSessionServiceInterface {
  fetchSession(): Promise<FetchSessionServiceInterfaceNamespace.Response>;
}

export namespace FetchSessionServiceInterfaceNamespace {
  export type Response = HttpResponse;
}
