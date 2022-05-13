import { Router } from "express";

import userRouter from "./userRouter.js";

const routes = Router();

routes.use("/users", userRouter);

export default routes;
