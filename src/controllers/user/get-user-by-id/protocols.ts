import { IUser } from "../../../models/user";

export interface IGetUserByIdRepository {
  getUserById(id: string): Promise<IUser>;
}
