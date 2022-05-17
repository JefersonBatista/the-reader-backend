import { Router } from "express";

import readingController from "../controllers/readingController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import readingSchema from "../schemas/readingSchema.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const readingRouter = Router();

readingRouter.post(
  "/",
  validateSchema(readingSchema),
  validateToken,
  readingController.create
);

export default readingRouter;
