import { startApolloServer } from '@config/apolloServer';
import { typeDefs, resolvers } from '@graphql/schema';

import { connectionDB } from '@config/database';
import { createRoles } from './libs/initialDocuments/rol.document';
import { createPermissionBase } from './libs/initialDocuments/permission.document';
import { createUser } from '@libs/initialDocuments/rootAuth.document';

//database
connectionDB();

//data base for work
createRoles();
createPermissionBase();
createUser();

//init apollo server
startApolloServer(typeDefs, resolvers);
