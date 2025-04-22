import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import http from "http";
import codeBlockController from "./controller/codeblock_controller.js";
import setupSocket from "./logic/socket_logic.js";
import dal from "./dal/dal.js";

const app = express();

const allowedOrigins = [
  "https://online-coding-web-app-client-hnla.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (_, res) => res.status(200).send("OK"));
app.use("/api", codeBlockController);

const server = http.createServer(app);
setupSocket(server);

const port = process.env.PORT || 3001;

server.listen(port, () =>
  console.log(`listening (HTTP + WebSocket) on ${port}…`)
);

dal.connect();