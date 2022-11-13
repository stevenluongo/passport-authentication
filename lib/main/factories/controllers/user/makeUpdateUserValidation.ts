import { RequiredFieldValidation } from '../../../../infra/http/validations/requiredFieldValidation';
import { ValidationComposite } from '../../../../infra/http/validations/validationComposite';

export const makeUpdateUserValidation = (): ValidationComposite =>
  new ValidationComposite([new RequiredFieldValidation('id')], 'params');
