import express from "express";
import { CreateServiceController } from "../controllers/service/create-service/create-service";
import { DeleteServiceController } from "../controllers/service/delete-service/delete.service";
import { GetServiceByIdController } from "../controllers/service/get-service-by-id/get-service-by-id";
import { GetServicesController } from "../controllers/service/get-services/get-services";
import { UpdateServiceController } from "../controllers/service/update-service/update-service";
import { PostgresCreateServiceRepository } from "../repositories/service/create-service/postgres-create-service";
import { PostgresDeleteServiceRepository } from "../repositories/service/delete-service/postgres-delete-service";
import { PostgresGetServiceByIdRepository } from "../repositories/service/get-service-by-id/postgres-get-service-by-id";
import { PostgresGetServices } from "../repositories/service/get-service/postgres-get-services";
import { PostgresUpdateServiceRepository } from "../repositories/service/update-service/postgres-update-service";
import verifyToken from "../middlewares/verifyToken";

const serviceRouter = express.Router();
serviceRouter.use(express.json());

serviceRouter.use(verifyToken);

serviceRouter.post("/", async (req, res) => {
  const postgresCreateServiceRepository = new PostgresCreateServiceRepository();
  const createServiceController = new CreateServiceController(
    postgresCreateServiceRepository
  );

  const { body, statusCode } = await createServiceController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

serviceRouter.delete("/:id", async (req, res) => {
  const postgresDeleteServerRepository = new PostgresDeleteServiceRepository();

  const deleteServiceController = new DeleteServiceController(
    postgresDeleteServerRepository
  );

  const { body, statusCode } = await deleteServiceController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

serviceRouter.get("/", async (req, res) => {
  const postgressGetServicesRepository = new PostgresGetServices();
  const getServicesController = new GetServicesController(
    postgressGetServicesRepository
  );

  const { body, statusCode } = await getServicesController.handle();

  res.status(statusCode).send(body);
});

serviceRouter.get("/:id", async (req, res) => {
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

serviceRouter.patch("/:id", async (req, res) => {
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

export default serviceRouter;
