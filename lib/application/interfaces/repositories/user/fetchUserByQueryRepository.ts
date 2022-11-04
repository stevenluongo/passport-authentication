export interface FetchUserByQueryRepository {
    fetchUserByQuery(
        data: FetchUserByQueryRepositoryNamespace.Request
    ): Promise<FetchUserByQueryRepositoryNamespace.Response>;
}

export namespace FetchUserByQueryRepositoryNamespace {
    export type Request = any;
    export type Response = any;
}
