import { RequiredFieldValidation } from "../../../../infra/http/validations/requiredFieldValidation";
import { ValidationComposite } from "../../../../infra/http/validations/validationComposite";

export const makeFetchUserByIdValidation = (): ValidationComposite =>
  new ValidationComposite([new RequiredFieldValidation("id")], "body");
