import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./router/main.js";

const server = express();

server.use(helmet());
server.use(cors());
server.use(urlencoded({extended: true}));
server.use(express.json());

server.use(mainRouter);

server.listen(process.env.PORT || 3000, () => {
   console.log(`servidor rodando em: ${process.env.BASE_URL}`);
})