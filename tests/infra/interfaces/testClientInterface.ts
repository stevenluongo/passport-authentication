import { UserProps } from '@domain/entities/user';

type BodyProps = {
  error: string;
  user?: UserProps;
  users?: UserProps[];
};

export type ResponseProps = {
  _body: BodyProps;
  status: number;
};
