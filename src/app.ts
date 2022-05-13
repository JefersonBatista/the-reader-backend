import express, { json } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routers/routes.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(routes);
app.use(errorHandler);

export default app;
