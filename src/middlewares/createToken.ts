import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { IUser } from "../models/user";

config();
const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = (user: IUser) => {
  if (JWT_SECRET) {
    return jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "48h",
    });
  } else {
    throw new Error("JWT SECRET IS EMPTY BRUDA");
  }
};
