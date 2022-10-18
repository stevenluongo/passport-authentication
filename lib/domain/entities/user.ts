export type UserProps = {
  id: string;
  emailAddress: string;
  username: string;
  createdAt: Date;
  password: string;
  salt: string;
  hash: string;
};

export class User {
  public readonly id: string;
  public readonly emailAddress: string;
  public readonly createdAt: Date;
  public readonly username: string;
  public readonly salt: string;
  public readonly hash: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.emailAddress = props.emailAddress;
    this.username = props.username;
    this.salt = props.salt;
    this.hash = props.hash;
    this.createdAt = props.createdAt;
  }
}
