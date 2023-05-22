import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import subhRoutes from "./routes/subs";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

//공부해야할것 : express란? morgan이란? async awaite 개념
//express -> 웹애플리케이션을 만들기 위한 프레임워크

const app = express(); //express 최상위 함수
const origin = "http://localhost:3000";
app.use(cors({
  origin,
  credentials: true
}))
app.use(cors({
  origin
}))
app.use(express.json()); //request에서 json형식으로 보낸 데이터를 받기위함
app.use(morgan("dev"));
app.use(cookieParser());
dotenv.config();

app.get("/", (_, res) => res.send("running")); //"/" <- 이경로로 오면 "running"이라는 메시지를 주겠다
app.use("/api/auth", authRoutes);
app.use("/api/subs", subhRoutes);
let port = 4000;
app.listen(port, async () => {
  console.log(`server running at http://localhost:${port}`);

  AppDataSource.initialize()
    .then(() => {
      console.log("Database Init");
    })
    .catch((error) => console.log(error));
});
