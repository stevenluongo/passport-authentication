export interface FetchUserByIdRepository {
  fetchUserById(
    data: FetchUserByIdRepositoryNamespace.Request
  ): Promise<FetchUserByIdRepositoryNamespace.Response>;
}

export namespace FetchUserByIdRepositoryNamespace {
  export type Request = string;
  export type Response = any;
}
