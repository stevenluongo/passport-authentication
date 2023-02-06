import { BaseService } from './BaseService';
import {
  FetchSessionServiceInterface,
  FetchSessionServiceInterfaceNamespace,
} from './interfaces/auth/fetchSessionServiceInterface';
import {
  LoginServiceInterface,
  LoginServiceInterfaceNamespace,
} from './interfaces/auth/loginServiceInterface';
import { LogoutServiceInterfaceNamespace } from './interfaces/auth/logoutServiceInterface';

export class AuthService
  extends BaseService
  implements
    LoginServiceInterface,
    LoginServiceInterface,
    FetchSessionServiceInterface
{
  static base = '/auth';

  public async login(
    body: LoginServiceInterfaceNamespace.Request
  ): Promise<LoginServiceInterfaceNamespace.Response> {
    return await this.POST({ path: `${AuthService.base}/login`, body });
  }

  public async logout(): Promise<LogoutServiceInterfaceNamespace.Response> {
    return await this.GET({ path: `${AuthService.base}/logout` });
  }

  public async fetchSession(): Promise<FetchSessionServiceInterfaceNamespace.Response> {
    return await this.GET({ path: `${AuthService.base}/session` });
  }
}
