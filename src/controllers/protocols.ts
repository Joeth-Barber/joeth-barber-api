export interface IHttpRequest<B> {
  params?: any;
  header?: any;
  body?: B;
}

export interface IHttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface IController {
  handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<unknown>>;
}
