import express from "express";
import { config } from "dotenv";
import { GetCustomersController } from "./controllers/customer/get-customers/get-customers";
import { PostgresGetCustomersRepository } from "./repositories/customer/get-customer/postgres-get-customers";
import { CreateCustomerController } from "./controllers/customer/create-customer/create-customer";
import { PostgresCreateCustomerRepository } from "./repositories/customer/create-customer/postgres-create-customer";
import { PostgresUpdateCustomerRepository } from "./repositories/customer/update-customer/postgres-update-customer";
import { UpdateCustomerController } from "./controllers/customer/update-customer/update-customer";
import { PostgresDeleteCustomerRepository } from "./repositories/customer/delete-customer/postgres-delete-customer";
import { DeleteCustomerController } from "./controllers/customer/delete-customer/delete-customer";
import { PostgresGetCustomerByIdRepository } from "./repositories/customer/get-customer-by-id/postgres-get-customer-by-id";
import { GetCustomerByIdController } from "./controllers/customer/get-customer-by-id/get-customer-by-id";
import { PostgresCreateServiceRepository } from "./repositories/service/create-service/postgres-create-service";
import { CreateServiceController } from "./controllers/service/create-service/create-service";
import { PostgresDeleteServiceRepository } from "./repositories/service/delete-service/postgres-delete-service";
import { DeleteServiceController } from "./controllers/service/delete-service/delete.service";
import { PostgresGetServices } from "./repositories/service/get-service/postgres-get-services";
import { GetServicesController } from "./controllers/service/get-services/get-services";
import { PostgresGetServiceByIdRepository } from "./repositories/service/get-service-by-id/postgres-get-service-by-id";
import { GetServiceByIdController } from "./controllers/service/get-service-by-id/get-service-by-id";
import { PostgresUpdateServiceRepository } from "./repositories/service/update-service/postgres-update-service";
import { UpdateServiceController } from "./controllers/service/update-service/update-service";

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

app.delete("/customers/:id", async (req, res) => {
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

app.get("/customers/:id", async (req, res) => {
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

app.post("/services", async (req, res) => {
  const postgresCreateServiceRepository = new PostgresCreateServiceRepository();
  const createServiceController = new CreateServiceController(
    postgresCreateServiceRepository
  );

  const { body, statusCode } = await createServiceController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

app.delete("/services/:id", async (req, res) => {
  const postgresDeleteServerRepository = new PostgresDeleteServiceRepository();

  const deleteServiceController = new DeleteServiceController(
    postgresDeleteServerRepository
  );

  const { body, statusCode } = await deleteServiceController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

app.get("/services", async (req, res) => {
  const postgressGetServicesRepository = new PostgresGetServices();
  const getServicesController = new GetServicesController(
    postgressGetServicesRepository
  );

  const { body, statusCode } = await getServicesController.handle();

  res.status(statusCode).send(body);
});

app.get("/services/:id", async (req, res) => {
  const postgresGetServiceByIdRepository =
    new PostgresGetServiceByIdRepository();

  const getServiceByIdController = new GetServiceByIdController(
    postgresGetServiceByIdRepository
  );

  const { body, statusCode } = await getServiceByIdController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

app.patch("/services/:id", async (req, res) => {
  const postgresUpdateServiceRepository = new PostgresUpdateServiceRepository();

  const updateServiceController = new UpdateServiceController(
    postgresUpdateServiceRepository
  );

  const { body, statusCode } = await updateServiceController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
