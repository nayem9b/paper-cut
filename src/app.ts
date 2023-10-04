import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes/route";

const app: Application = express();

// Middleweres

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Paper Cut");
});

export default app;
