import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

//공부해야할것 : express란? morgan이란? async awaite 개념
//express -> 웹애플리케이션을 만들기 위한 프레임워크

const app = express(); //express 최상위 함수

app.use(express.json()); //request에서 json형식으로 보낸 데이터를 받기위함
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("running")); //"/" <- 이경로로 오면 "running"이라는 메시지를 주겠다

let port = 4000;
app.listen(port, async () => {
  console.log(`server running at http://localhost:${port}`);

  AppDataSource.initialize()
    .then(() => {
      console.log("Database Init");
    })
    .catch((error) => console.log(error));
});
