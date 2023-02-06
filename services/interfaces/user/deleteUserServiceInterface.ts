import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface DeleteUserServiceInterface {
  deleteUser(
    payload: DeleteUserServiceInterfaceNamespace.Request
  ): Promise<DeleteUserServiceInterfaceNamespace.Response>;
}

export namespace DeleteUserServiceInterfaceNamespace {
  export type Request = { id: string };
  export type Response = HttpResponse;
}
