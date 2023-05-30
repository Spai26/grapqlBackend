import { startApolloServer } from '@config/apolloServer';
import { typeDefs } from '@graphql/types/typesDefs';
import { resolvers } from '@graphql/resolvers/resolvers';
import { connectionDB } from '@config/mongodb';
import { createRoles } from './libs/initialDocuments/rol.document';

connectionDB();
createRoles();
startApolloServer(typeDefs, resolvers);
