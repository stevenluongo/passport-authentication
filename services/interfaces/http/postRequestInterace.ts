import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface PostRequestInterface {
  POST(
    payload: PostRequestInterfaceNamespace.Request
  ): Promise<PostRequestInterfaceNamespace.Response>;
}

export namespace PostRequestInterfaceNamespace {
  export type Request = { path: string; body: object; csrfToken?: string };
  export type Response = HttpResponse;
}
