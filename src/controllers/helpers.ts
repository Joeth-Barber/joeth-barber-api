import { HttpStatusCode, IHttpResponse } from "./protocols";

export const ok = <T>(body: any): IHttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
});

export const created = <T>(body: any): IHttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const badRequest = (message: string): IHttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const unauthorized = (message: string): IHttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.UNAUTHORIZED,
    body: message,
  };
};

export const serverError = (
  message: string = "Error not treated."
): IHttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: message,
  };
};
