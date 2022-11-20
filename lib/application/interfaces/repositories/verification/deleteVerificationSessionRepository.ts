export interface DeleteVerificationSessionRepository {
  deleteVerificationSession(
    payload: DeleteVerificationSessionRepositoryNamespace.Request
  ): Promise<DeleteVerificationSessionRepositoryNamespace.Response>;
}

export namespace DeleteVerificationSessionRepositoryNamespace {
  export type Request = string;
  export type Response = { acknowledged: boolean; deletedCount: number };
}
