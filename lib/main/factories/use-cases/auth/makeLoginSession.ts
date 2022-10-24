import { LoginSessionInterface } from '../../../../application/interfaces/use-cases/auth/loginSessionInterface';
import { LoginSession } from '../../../../application/use-cases/auth/loginSession';

export const makeLoginSession = (): LoginSessionInterface => {
  return new LoginSession();
};
