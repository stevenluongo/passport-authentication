export interface FetchVerificationSessionByIdRepository {
  fetchVerificationSessionById(
    payload: FetchVerificationSessionByIdRepositoryNamespace.Request
  ): Promise<FetchVerificationSessionByIdRepositoryNamespace.Response>;
}

export namespace FetchVerificationSessionByIdRepositoryNamespace {
  export type Request = string;
  export type Response = any;
}
