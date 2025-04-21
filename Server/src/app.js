import cors from "cors";
import express from 'express';
import http from "http";
import codeBlockController from './controller/codeblock_controller.js';
import dal from "./dal/dal.js";
import setupSocket from "./logic/socket_logic.js";


dal.connect();

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use("/api" ,codeBlockController);

const port = process.env.PORT || 3001;

setupSocket(server);

server.listen(port, () => console.log(`listening (HTTP + WebSocket) on ${port}…`));