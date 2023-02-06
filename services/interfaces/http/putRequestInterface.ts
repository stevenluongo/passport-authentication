import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface PutRequestInterface {
  PUT(
    payload: PutRequestInterfaceNamespace.Request
  ): Promise<PutRequestInterfaceNamespace.Response>;
}

export namespace PutRequestInterfaceNamespace {
  export type Request = { path: string; body: object; csrfToken?: string };
  export type Response = HttpResponse;
}
