import expresss, { Application } from "express";
import main from "./main";
import db from "./Config/db";
import env from "dotenv"
env.config()


const realPort =parseInt(process.env.PORT!)
const port: number = realPort

const app: Application = expresss();
main(app);

const server = app.listen(port, () => {
  console.log("");
  db();
  console.log("server listening ");
});

process.on("uncaughtException", (error: any) => {
  console.log("server is shutting down due to uncaught exception");
  console.log(error);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("server is shutting down due unhandled rejection");
  console.log(reason);
  server.close(() => {
    process.exit(1);
  });
});
