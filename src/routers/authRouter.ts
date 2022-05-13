import { Router } from "express";

import authController from "../controllers/authController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import signInSchema from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post(
  "/sign-in",
  validateSchema(signInSchema),
  authController.signIn
);

export default authRouter;
