import { RequiredFieldValidation } from '../../../../infra/http/validations/requiredFieldValidation';
import { ValidationComposite } from '../../../../infra/http/validations/validationComposite';

export const makeDeleteUserValidation = (): ValidationComposite =>
  new ValidationComposite([new RequiredFieldValidation('id')], 'params');
