import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { config } from 'dotenv';
import compression from 'compression';
import cookieParser = require('cookie-parser');

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import routeIndex from '@routes/index';
import { corsOptions } from '@libs/corsOptions';
import { isAuthentificate, MyContext, BaseContext } from '@libs/apolloContext';

config();
const { PORT, HOST, NODE_ENV } = process.env;

const app = express();
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

export async function startApolloServer(
  typeDefs: any,
  resolvers: any
): Promise<void> {
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
  console.log(`Node env on ${NODE_ENV}`);
  console.log(`✓ Server running on ${HOST}:${PORT}  `);
  console.log(`✓ GraphQL running on ${HOST}:${PORT}/graphql  `);
}
