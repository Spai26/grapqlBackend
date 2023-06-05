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
import { getUserToken } from 'src/libs/helpers/context';

config();

const PORT: Number = Number.parseInt(process.env.PORT) || 3000;

type BaseContext = {};

interface MyContext {
  user?: BaseContext;
}

export async function startApolloServer(
  typeDefs: any,
  resolvers: any
): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  app.use(morgan('dev'));
  app.use('/api', apiRoute);

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => (await getUserToken(req)) as BaseContext
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
