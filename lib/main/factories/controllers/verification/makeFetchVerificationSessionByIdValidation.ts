import { IdValidation } from '@infra/http/validations/idValidation';
import { RequiredFieldValidation } from '@infra/http/validations/requiredFieldValidation';
import { ValidationComposite } from '@infra/http/validations/validationComposite';

export const makeFetchVerificationSessionByIdValidation =
  (): ValidationComposite =>
    new ValidationComposite(
      [new RequiredFieldValidation('_id'), new IdValidation('_id')],
      'body'
    );
