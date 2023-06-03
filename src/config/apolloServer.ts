import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { json } from 'body-parser';
import { config } from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import apiRoute from '@routes/index';

config();
const PORT: Number = Number.parseInt(process.env.PORT) || 3000;

interface Context {
  token?: String;
}
export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  app.use(morgan('dev'));
  app.use('/api', apiRoute);
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.token
      })
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen(
      {
        port: PORT
      },
      resolve
    )
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}
