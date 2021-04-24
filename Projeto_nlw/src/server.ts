import { http } from "./http";
import "./websocket/client";
import "./websocket/admin";

http.listen(3333, () => console.log("server is running on port 3333"));


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