import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

// Middleweres

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
