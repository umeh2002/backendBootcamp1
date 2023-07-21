import express, { Application } from "express";
import cors from "cors";
import auth from "./Router.ts/authRouter"

const main = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use("/api/v1/userAuth", auth)
};

export default main;
