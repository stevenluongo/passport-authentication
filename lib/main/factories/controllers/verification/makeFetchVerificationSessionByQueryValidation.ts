import { RequiredFieldValidation } from '@infra/http/validations/requiredFieldValidation';
import { ValidationComposite } from '@infra/http/validations/validationComposite';

export const makeFetchVerificationSessionByQueryValidation =
  (): ValidationComposite =>
    new ValidationComposite([new RequiredFieldValidation('hash')], 'body');
