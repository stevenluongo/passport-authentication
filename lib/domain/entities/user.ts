export type UserProps = {
  id?: string;
  emailAddress?: string;
  username?: string;
  createdAt?: Date;
  password?: string;
  salt?: string;
  hash?: string;
  githubId?: string;
};

export class User {
  constructor(
    public readonly id: string,
    public readonly emailAddress: string,
    public readonly createdAt: Date,
    public readonly username: string,
    public readonly salt: string,
    public readonly hash: string,
    public readonly githubId: string
  ) {}
}
