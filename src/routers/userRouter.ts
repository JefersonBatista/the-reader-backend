import { Router } from "express";

import userController from "../controllers/userController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/", validateSchema(userSchema), userController.signUp);

export default userRouter;
