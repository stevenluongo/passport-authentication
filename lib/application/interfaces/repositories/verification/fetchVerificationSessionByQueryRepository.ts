export interface FetchVerificationSessionByQueryRepository {
  fetchVerificationSessionByQuery(
    payload: FetchVerificationSessionByQueryRepositoryNamespace.Request
  ): Promise<FetchVerificationSessionByQueryRepositoryNamespace.Response>;
}

export namespace FetchVerificationSessionByQueryRepositoryNamespace {
  export type Request = any;
  export type Response = any;
}
