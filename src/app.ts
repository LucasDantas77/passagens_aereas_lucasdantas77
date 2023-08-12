import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import UserRoutes from "./routers/user.routes";

const app: Application = express();

app.use(express.json());

app.use("/users", UserRoutes);
// app.use("/login");

app.use(handleErrors);

export default app;
