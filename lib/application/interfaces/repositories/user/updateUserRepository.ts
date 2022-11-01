export interface UpdateUserRepository {
    updateUser(
        data: UpdateUserRepositoryNamespace.Request
    ): Promise<UpdateUserRepositoryNamespace.Response>;
}

export namespace UpdateUserRepositoryNamespace {
    export type Request = any;
    export type Response = any;
}
