import { EmailValidation } from '@infra/http/validations/emailValidation';
import { IdValidation } from '@infra/http/validations/idValidation';
import { RequiredFieldValidation } from '@infra/http/validations/requiredFieldValidation';
import { ValidationComposite } from '@infra/http/validations/validationComposite';

export const makeCreateVerificationSessionValidation =
  (): ValidationComposite =>
    new ValidationComposite(
      [
        new RequiredFieldValidation('_id'),
        new RequiredFieldValidation('username'),
        new RequiredFieldValidation('emailAddress'),
        new EmailValidation('emailAddress'),
        new IdValidation('_id'),
      ],
      'body'
    );
