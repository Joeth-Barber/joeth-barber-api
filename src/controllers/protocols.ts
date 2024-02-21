export interface IHttpRequest<B> {
  params?: any;
  header?: any;
  body?: B;
}

export interface IHttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<unknown>>;
}
