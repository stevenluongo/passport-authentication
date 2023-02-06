import { Roles } from '@domain/entities/user';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';

export interface CreateUserServiceInterface {
  createUser(
    payload: CreateUserServiceInterfaceNamespace.Request
  ): Promise<CreateUserServiceInterfaceNamespace.Response>;
}

export namespace CreateUserServiceInterfaceNamespace {
  export type Request = {
    body: {
      username: string;
      password: string;
      firstName: string;
      lastName: string;
      role: Roles;
    };
    csrfToken?: string;
  };
  export type Response = HttpResponse;
}
