import { Router } from "express";

import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import readingRouter from "./readingRouter.js";
import readingIntentionRouter from "./readingIntentionRouter.js";
import noteRouter from "./noteRouter.js";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/auth", authRouter);
routes.use("/readings", readingRouter);
routes.use("/reading-intentions", readingIntentionRouter);
routes.use("/readings", noteRouter);

export default routes;
