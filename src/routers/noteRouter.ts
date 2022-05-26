import { Router } from "express";

import noteController from "../controllers/noteController.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import noteSchema from "../schemas/noteSchema.js";
import validateToken from "../middlewares/tokenValidationMiddleware.js";

const noteRouter = Router();
noteRouter.use(validateToken);

noteRouter.post(
  "/:id/notes",
  validateSchema(noteSchema),
  noteController.create
);
noteRouter.get("/:id/notes", noteController.get);

export default noteRouter;
