import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { config } from 'dotenv';
import compression from 'compression';
import { logger } from '@libs/winstom.lib';
import cookieParser = require('cookie-parser');

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import routeIndex from '@routes/index';
import { corsOptions } from '@libs/corsOptions';
import { isAuthentificate, MyContext, BaseContext } from '@libs/apolloContext';

//variables de entorno
config();
const { PORT, HOST, NODE_ENV } = process.env;

//configuracion de express
const app = express();
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

//apollo server function start
export async function startApolloServer(
  typeDefs: any,
  resolvers: any
): Promise<void> {
  const httpServer = http.createServer(app);

  //graphql-tols/schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  //graphql-middleware

  const server = new ApolloServer<MyContext>({
    schema,
    introspection: NODE_ENV !== 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  //raiz api-rest
  app.use('/api', routeIndex);

  //raiz graphql
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

  //info proyect
  logger.info(`Node env on ${NODE_ENV}`);
  logger.info(`✓ Server running on ${HOST}:${PORT}  `);
  logger.info(`✓ GraphQL running on ${HOST}:${PORT}/graphql  `);
}
