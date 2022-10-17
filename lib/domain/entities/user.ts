export type UserProps = {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export class User {
  public readonly id: string;
  public readonly emailAddress: string;
  public readonly createdAt: Date;
  public readonly firstName: string;
  public readonly lastName: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.emailAddress = props.emailAddress;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.createdAt = props.createdAt;
  }
}
