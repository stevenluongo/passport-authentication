export interface FetchUserByIdRepository {
  fetchUserById(
    data: FetchUserByIdRepositoryNamespace.Request
  ): Promise<FetchUserByIdRepositoryNamespace.Response>;
}

export namespace FetchUserByIdRepositoryNamespace {
  export type Request = any;
  export type Response = any;
}
