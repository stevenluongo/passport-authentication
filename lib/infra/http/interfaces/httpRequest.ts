export type HttpRequest<
  TBody = any,
  TParams = any,
  THeaders = any,
  TUser = any
> = {
  body?: TBody;
  params?: TParams;
  headers?: THeaders;
  user?: TUser;
};
