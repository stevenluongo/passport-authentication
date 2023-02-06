import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface LoginServiceInterface {
  login(
    payload: LoginServiceInterfaceNamespace.Request
  ): Promise<LoginServiceInterfaceNamespace.Response>;
}

export namespace LoginServiceInterfaceNamespace {
  export type Request = { username: string; password: string };
  export type Response = HttpResponse;
}
