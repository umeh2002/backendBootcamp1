import express, { Application } from "express";
import cors from "cors";
import auth from "./Router.ts/authRouter"
import teacher from "./Router.ts/authTeacherRouter"

const main = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use("/api/v1/userAuth", auth)
  app.use("/api/v1/authTeacher", teacher)
};

export default main;
