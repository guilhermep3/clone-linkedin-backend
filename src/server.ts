import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./router/main.js";

const server = express();

server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.use(express.json());

server.use(mainRouter);

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

server.listen(PORT, () => {
   console.log(`Servidor rodando em: ${BASE_URL}`);
});
