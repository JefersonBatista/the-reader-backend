import { Router } from "express";

import readingController from "../controllers/readingController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import readingSchema from "../schemas/readingSchema.js";
import bookmarkSchema from "../schemas/bookmarkSchema.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const readingRouter = Router();
readingRouter.use(validateToken);

readingRouter.post(
  "/",
  validateSchema(readingSchema),
  readingController.create
);

readingRouter.get("/", readingController.get);
readingRouter.patch("/:id/finish", readingController.finish);

readingRouter.patch(
  "/:id/bookmark",
  validateSchema(bookmarkSchema),
  readingController.bookmark
);

export default readingRouter;
