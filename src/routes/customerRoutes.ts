import express from "express";
import { PostgresGetCustomersRepository } from "../repositories/customer/get-customer/postgres-get-customers";
import { GetCustomersController } from "../controllers/customer/get-customers/get-customers";
import { CreateCustomerController } from "../controllers/customer/create-customer/create-customer";
import { DeleteCustomerController } from "../controllers/customer/delete-customer/delete-customer";
import { GetCustomerByIdController } from "../controllers/customer/get-customer-by-id/get-customer-by-id";
import { UpdateCustomerController } from "../controllers/customer/update-customer/update-customer";
import { PostgresCreateCustomerRepository } from "../repositories/customer/create-customer/postgres-create-customer";
import { PostgresDeleteCustomerRepository } from "../repositories/customer/delete-customer/postgres-delete-customer";
import { PostgresGetCustomerByIdRepository } from "../repositories/customer/get-customer-by-id/postgres-get-customer-by-id";
import { PostgresUpdateCustomerRepository } from "../repositories/customer/update-customer/postgres-update-customer";

const customerRouter = express.Router();
customerRouter.use(express.json());

customerRouter.get("/", async (req, res) => {
  const postgresGetCustomersRepository = new PostgresGetCustomersRepository();
  const getCustomersController = new GetCustomersController(
    postgresGetCustomersRepository
  );

  const { body, statusCode } = await getCustomersController.handle();

  res.status(statusCode).send(body);
});

customerRouter.post("/", async (req, res) => {
  const postgresCreateCustomerRepository =
    new PostgresCreateCustomerRepository();
  const createCustomerController = new CreateCustomerController(
    postgresCreateCustomerRepository
  );

  const { body, statusCode } = await createCustomerController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

customerRouter.patch("/:id", async (req, res) => {
  const postgresUpdateCustomerRepository =
    new PostgresUpdateCustomerRepository();

  const updateCustomerController = new UpdateCustomerController(
    postgresUpdateCustomerRepository
  );

  const { body, statusCode } = await updateCustomerController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

customerRouter.delete("/:id", async (req, res) => {
  const postgresDeleteCustomerRepository =
    new PostgresDeleteCustomerRepository();

  const deleteCustomerController = new DeleteCustomerController(
    postgresDeleteCustomerRepository
  );

  const { body, statusCode } = await deleteCustomerController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

customerRouter.get("/:id", async (req, res) => {
  const postgresGetCustomerByIdRepository =
    new PostgresGetCustomerByIdRepository();

  const getCustomerByIdController = new GetCustomerByIdController(
    postgresGetCustomerByIdRepository
  );

  const { body, statusCode } = await getCustomerByIdController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
export default customerRouter;
