export interface CreateVerificationSessionRepository {
  createVerificationSession(
    payload: CreateVerificationSessionRepositoryNamespace.Request
  ): Promise<CreateVerificationSessionRepositoryNamespace.Response>;
}

export namespace CreateVerificationSessionRepositoryNamespace {
  export type Request = any;
  export type Response = any;
}
