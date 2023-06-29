import { startApolloServer } from '@config/apolloServer';
import { typeDefs, resolvers } from '@graphql/schema';

import { connectionDB } from '@config/database';
import { createRoles } from './libs/initialDocuments/rol.document';
import { createPermissionBase } from './libs/initialDocuments/permission.document';
import { createUser } from '@libs/initialDocuments/rootAuth.document';

connectionDB();
createRoles();
createPermissionBase();
createUser();
startApolloServer(typeDefs, resolvers);
