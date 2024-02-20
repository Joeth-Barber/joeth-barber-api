import express from "express";
import { config } from "dotenv";

import customerRouter from "./routes/customerRoutes";
import bookingRouter from "./routes/bookingRoutes";
import serviceRouter from "./routes/serviceRoutes";

config();

const app = express();
const port = process.env.PORT || 3333;

app.use("/customers", customerRouter);
app.use("/bookings", bookingRouter);
app.use("/services", serviceRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
