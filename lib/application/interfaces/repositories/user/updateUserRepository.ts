export interface UpdateUserRepository {
  updateUser(
    payload: UpdateUserRepositoryNamespace.Request
  ): Promise<UpdateUserRepositoryNamespace.Response>;
}

export namespace UpdateUserRepositoryNamespace {
  export type Request = { _id: string; filter: any };
  export type Response = {
    acknowledged: boolean;
    modifiedCount: number;
    matchedCount: number;
  };
}
