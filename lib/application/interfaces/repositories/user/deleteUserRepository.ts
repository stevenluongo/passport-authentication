export interface DeleteUserRepository {
    deleteUser(
        data: DeleteUserRepositoryNamespace.Request
    ): Promise<DeleteUserRepositoryNamespace.Response>;
}

export namespace DeleteUserRepositoryNamespace {
    export type Request = any;
    export type Response = any;
}
