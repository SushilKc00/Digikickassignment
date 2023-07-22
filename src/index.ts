import express, { Request, Response, RouterOptions } from "express";
import path from "path";
import router from "./routes/router";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import { dbconnection } from "./database/dbconfig";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const url = process.env.DB_URL;
const Port = process.env.PORT || 8080;

//midelwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//router middleware
app.use("/api/auth", router);
app.use("/api/user", userRouter);

app.use(express.static(path.join(__dirname, "../client/dist/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

//dbconnection
dbconnection(url);

app.listen(Port, (): void => {
  console.log("server running");
});
