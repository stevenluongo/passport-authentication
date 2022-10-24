import { LoginSessionInterface, LoginSessionInterfaceNamespace } from '../../interfaces/use-cases/auth/loginSessionInterface';

export class LoginSession implements LoginSessionInterface {
  async execute(
    userData: LoginSessionInterfaceNamespace.Request
  ): Promise<LoginSessionInterfaceNamespace.Response> {
    //our logic here to create a new user
    return;
  }
}
