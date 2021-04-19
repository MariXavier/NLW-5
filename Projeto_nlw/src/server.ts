import express from "express";

const app = express();

app.get("/", (request, response) => 
{
    return response.json({message:"olá nlw 05"})
});

app.post("/users", (request, response) => 
{
    return response.json({message:"usuário salvo com sucesso"})
});

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