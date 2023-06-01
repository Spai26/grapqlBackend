import { startApolloServer } from '@config/apolloServer';
import { typeDefs, resolvers } from '@graphql/schema';

import { connectionDB } from '@config/mongodb';
import { createRoles } from './libs/initialDocuments/rol.document';

connectionDB();
createRoles();
startApolloServer(typeDefs, resolvers);
