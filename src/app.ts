import express, { json, Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());
app.get("/health", (req: Request, res: Response) => res.send("OK"));

export default app;
