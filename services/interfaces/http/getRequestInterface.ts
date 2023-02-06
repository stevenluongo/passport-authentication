import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface GetRequestInterface {
  GET(
    payload: GetRequestInterfaceNamespace.Request
  ): Promise<GetRequestInterfaceNamespace.Response>;
}

export namespace GetRequestInterfaceNamespace {
  export type Request = { path: string; csrfToken?: string };
  export type Response = HttpResponse;
}