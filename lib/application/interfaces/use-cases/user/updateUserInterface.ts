import { UseCase } from '../useCase';

export interface UpdateUserInterface
  extends UseCase<
    UpdateUserInterfaceNamespace.Request,
    UpdateUserInterfaceNamespace.Response
  > {
  execute(
    payload: UpdateUserInterfaceNamespace.Request
  ): Promise<UpdateUserInterfaceNamespace.Response>;
}

export namespace UpdateUserInterfaceNamespace {
  export type Request = { _id: string; filter: any };
  export type Response = {
    acknowledged: boolean;
    modifiedCount: number;
    matchedCount: number;
  };
}
