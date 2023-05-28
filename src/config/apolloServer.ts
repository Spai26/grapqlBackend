import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { json } from 'body-parser';
import { config } from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import apiRoute from '@routes/index';

config();
const PORT = Number.parseInt(process.env.PORT) || 3000;

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpserver = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(morgan('dev'));
  app.use('/api', apiRoute);
  app.use('/graphql', cors(), json(), expressMiddleware(server));

  await new Promise<void>((resolve) =>
    httpserver.listen(
      {
        port: PORT
      },
      resolve
    )
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}
