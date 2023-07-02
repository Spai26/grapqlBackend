import { startApolloServer } from '@config/apolloServer';
import { typeDefs, resolvers } from '@graphql/schema';

import { connectionDB } from '@config/database';
import { createRoles } from './libs/seed/rol.document';
import { createPermissionBase } from './libs/seed/permission.document';
import { createUser } from '@libs/seed/rootAuth.document';

//database
connectionDB();

//data base for work
createRoles();
createPermissionBase();
createUser();

//init apollo server
startApolloServer(typeDefs, resolvers);
