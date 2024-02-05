import express from "express";
import { config } from "dotenv";
import { GetCustomersController } from "./controllers/customer/get-customers/get-customers";
import { PostgresGetCustomersRepository } from "./repositories/customer/get-customer/postgres-get-customers";
import { CreateCustomerController } from "./controllers/customer/create-customer/create-customer";
import { PostgresCreateCustomerRepository } from "./repositories/customer/create-customer/postgres-create-customer";
import { PostgresUpdateCustomerRepository } from "./repositories/customer/update-customer/postgres-update-customer";
import { UpdateCustomerController } from "./controllers/customer/update-customer/update-customer";

config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3333;

app.get("/customers", async (req, res) => {
  const postgresGetCustomersRepository = new PostgresGetCustomersRepository();
  const getCustomersController = new GetCustomersController(
    postgresGetCustomersRepository
  );

  const { body, statusCode } = await getCustomersController.handle();

  res.status(statusCode).send(body);
});

app.post("/customers", async (req, res) => {
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

app.patch("/customers/:id", async (req, res) => {
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

app.listen(port, () => console.log(`Listening on port ${port}`));
