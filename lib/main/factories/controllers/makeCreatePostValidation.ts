import { RequiredFieldValidation } from '../../../infra/http/validations/requiredFieldValidation';
import { ValidationComposite } from '../../../infra/http/validations/validationComposite';

export const makeCreatePostValidation = (): ValidationComposite =>
  new ValidationComposite(
    [
      new RequiredFieldValidation('username'),
      new RequiredFieldValidation('emailAddress'),
      new RequiredFieldValidation('password'),
    ],
    'body'
  );
