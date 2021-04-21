import express from "express";
import "./database";
import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("server is running on port 3333"));


/*
missaoespacial

yarn init -y
yarn add express
yarn add @types/express -D
yarn add typescript -D
yarn tsc --init
yarn add ts-node-dev -D
yarn dev
*/