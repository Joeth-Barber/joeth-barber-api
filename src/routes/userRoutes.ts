import express from "express";

import verifyToken from "../middlewares/verifyToken";

import { PostgresCreateUserRepository } from "../repositories/user/create-user/postgres-create-user";
import { PostgresUserLoginRepository } from "../repositories/user/customer-login/postgres-user-login";
import { PostgresDeleteUserRepository } from "../repositories/user/delete-user/postgres-delete-user";
import { PostgresGetUserByIdRepository } from "../repositories/user/get-user-by-id/postgres-get-user-by-id";
import { PostgresGetUsersRepository } from "../repositories/user/get-user/postgres-get-user";
import { PostgresUpdateUserRepository } from "../repositories/user/update-user/postgres-update-user";
import { CreateUserController } from "../controllers/user/create-user/create-user";
import { DeleteUserController } from "../controllers/user/delete-user/delete-user";
import { GetUserByIdController } from "../controllers/user/get-user-by-id/get-user-by-id";
import { GetUsersController } from "../controllers/user/get-user/get-user";
import { UpdateUserController } from "../controllers/user/update-user/update-user";
import { UserLoginController } from "../controllers/user/user-login/user-login";

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/", async (req, res) => {
  const postgresCreateUserRepository = new PostgresCreateUserRepository();
  const createUserController = new CreateUserController(
    postgresCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

userRouter.post("/login", async (req, res) => {
  const postgresUserLoginRepository = new PostgresUserLoginRepository();
  const userLoginController = new UserLoginController(
    postgresUserLoginRepository
  );

  const { body, statusCode } = await userLoginController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

userRouter.use(verifyToken);

userRouter.get("/", async (req, res) => {
  const postgresGetUsersRepository = new PostgresGetUsersRepository();
  const getUsersController = new GetUsersController(postgresGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

userRouter.patch("/:id", async (req, res) => {
  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

  const updateUserController = new UpdateUserController(
    postgresUpdateUserRepository
  );

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

userRouter.delete("/:id", async (req, res) => {
  const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

  const deleteUserController = new DeleteUserController(
    postgresDeleteUserRepository
  );

  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

userRouter.get("/:id", async (req, res) => {
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

  const getUserByIdController = new GetUserByIdController(
    postgresGetUserByIdRepository
  );

  const { body, statusCode } = await getUserByIdController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
export default userRouter;
