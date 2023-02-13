export type HttpResponse<T = any> = {
  statusCode: number;
  body?: T;
  user?: T;
  error?: string;
};
