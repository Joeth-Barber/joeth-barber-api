import { IUser } from "../../../models/user";

export interface IUserLoginParams {
  email: string;
  password: string;
}

export interface IUserLoginRepository {
  userLogin(params: IUserLoginParams): Promise<IUser>;
}
