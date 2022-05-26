import { Router } from "express";

import readingIntentionController from "../controllers/readingIntentionController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import readingIntentionSchema from "../schemas/readingIntentionSchema.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const readingIntentionRouter = Router();
readingIntentionRouter.use(validateToken);

readingIntentionRouter.post(
  "/",
  validateSchema(readingIntentionSchema),
  readingIntentionController.create
);

readingIntentionRouter.get("/", readingIntentionController.get);

readingIntentionRouter.patch(
  "/:id/increase-priority",
  readingIntentionController.increasePriority
);

readingIntentionRouter.patch(
  "/:id/decrease-priority",
  readingIntentionController.decreasePriority
);

readingIntentionRouter.delete("/:id/remove", readingIntentionController.remove);

export default readingIntentionRouter;
