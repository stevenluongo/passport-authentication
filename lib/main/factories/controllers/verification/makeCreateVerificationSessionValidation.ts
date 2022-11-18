import { RequiredFieldValidation } from '@infra/http/validations/requiredFieldValidation';
import { ValidationComposite } from '@infra/http/validations/validationComposite';

export const makeCreateVerificationSessionValidation =
  (): ValidationComposite =>
    new ValidationComposite([new RequiredFieldValidation('_id')], 'user');
