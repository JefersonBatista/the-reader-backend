import { Router } from "express";

import readingController from "../controllers/readingController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import readingSchema from "../schemas/readingSchema.js";
import bookmarkSchema from "../schemas/bookmarkSchema.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const readingRouter = Router();

readingRouter.post(
  "/",
  validateSchema(readingSchema),
  validateToken,
  readingController.create
);

readingRouter.get("/", validateToken, readingController.get);
readingRouter.patch("/:id/finish", validateToken, readingController.finish);

readingRouter.patch(
  "/:id/bookmark",
  validateSchema(bookmarkSchema),
  validateToken,
  readingController.bookmark
);

export default readingRouter;
