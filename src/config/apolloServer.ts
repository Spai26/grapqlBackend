import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { config } from 'dotenv';
import cookieParser = require('cookie-parser');

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import routeIndex from '@routes/index';
import { corsOptions } from '@libs/corsOptions';
import { isAuthentificate, MyContext, BaseContext } from '@libs/apolloContext';

config();

const PORT: Number = Number.parseInt(process.env.PORT) || 3000;

export async function startApolloServer(
  typeDefs: any,
  resolvers: any
): Promise<void> {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());

  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  app.use('/api', routeIndex);

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),

    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const user = (await isAuthentificate(req, res)) as BaseContext;
        return { user, req, res };
      }
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
