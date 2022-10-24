import { RequiredFieldValidation } from '../../../../infra/http/validations/requiredFieldValidation';
import { ValidationComposite } from '../../../../infra/http/validations/validationComposite';

export const makeLoginSessionValidation = (): ValidationComposite =>
  new ValidationComposite(
    [
      new RequiredFieldValidation('username'),
      new RequiredFieldValidation('password'),
    ],
    'body'
  );
