import express from 'express';
import dal from "./dal.js";

import codeBlockController from './controller/codeblock_controller.js';

const port = 3001;

dal.connect();

const app = express();

app.use(express.json());
app.use("/api" ,codeBlockController);


app.listen(port, () => console.log(`listening on port ${port}...`));