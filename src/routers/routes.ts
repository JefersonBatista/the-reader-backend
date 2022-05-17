import { Router } from "express";

import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import readingRouter from "./readingRouter.js";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/auth", authRouter);
routes.use("/readings", readingRouter);

export default routes;
