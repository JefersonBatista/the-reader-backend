import { Router } from "express";
import authRouter from "./authRouter.js";

import userRouter from "./userRouter.js";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/auth", authRouter);

export default routes;
