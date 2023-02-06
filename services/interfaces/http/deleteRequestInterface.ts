import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface DeleteRequestInterface {
  DELETE(
    payload: DeleteRequestInterfaceNamespace.Request
  ): Promise<DeleteRequestInterfaceNamespace.Response>;
}

export namespace DeleteRequestInterfaceNamespace {
  export type Request = { path: string; csrfToken?: string };
  export type Response = HttpResponse;
}
