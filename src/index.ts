import { startApolloServer } from '@config/apolloServer';
import { typeDefs } from '@graphql/types/typesDefs';
import { resolvers } from '@graphql/resolvers/resolvers';
import { connectionDB } from '@config/mongodb';

connectionDB();
startApolloServer(typeDefs, resolvers);
