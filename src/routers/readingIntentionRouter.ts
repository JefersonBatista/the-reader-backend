import { Router } from "express";

import readingIntentionController from "../controllers/readingIntentionController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import readingIntentionSchema from "../schemas/readingIntentionSchema.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const readingIntentionRouter = Router();

readingIntentionRouter.post(
  "/",
  validateSchema(readingIntentionSchema),
  validateToken,
  readingIntentionController.create
);

readingIntentionRouter.get("/", validateToken, readingIntentionController.get);

export default readingIntentionRouter;
