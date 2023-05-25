import express from "express";
import { config } from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "../database/schema/schema.js";
import connectionDB from "../config/mongodb.js";

config();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);

app.listen(
  port,
  console.log(`Server running in port : http://localhost:${port}/`)
);

connectionDB();
