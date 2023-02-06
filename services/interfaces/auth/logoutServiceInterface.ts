import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface LogoutServiceInterface {
  logout(): Promise<LogoutServiceInterfaceNamespace.Response>;
}

export namespace LogoutServiceInterfaceNamespace {
  export type Response = HttpResponse;
}
