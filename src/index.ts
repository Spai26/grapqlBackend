import { startApolloServer } from '@config/apolloServer';
import { typeDefs, resolvers } from '@graphql/schema';

import { connectionDB } from '@config/mongodb';
import { createRoles } from './libs/initialDocuments/rol.document';
import { createPermissionBase } from './libs/initialDocuments/permission.document';

connectionDB();
createRoles();
createPermissionBase();
startApolloServer(typeDefs, resolvers);
