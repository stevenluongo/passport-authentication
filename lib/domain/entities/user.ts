export type UserProps = {
  _id?: any;
  emailAddress?: string;
  username?: string;
  createdAt?: Date;
  password?: string;
  salt?: string;
  hash?: string;
  githubId?: string;
  role?: Roles;
};

export const roles = ['default', 'admin'] as const;

export type Roles = typeof roles[number];
