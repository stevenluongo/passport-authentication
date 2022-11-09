export type HttpResponse<T = any> = {
  statusCode: number;
  body?: T;
  user?: T;
  success?: boolean;
  message?: string;
};
