import gql from 'graphql-tag';
import { UsertypeDefs, UserResolvers } from './user.schema';
import { AuthTypeDefs, AuthResolvers } from './auth/auth.schema';
import { BlogtypeDefs, BlogResolvers } from './blog.schema';
import { RolesTypeDefs, RolResolvers } from './Roles.schema';
import { PermissionResolvers, PermissionTypeDefs } from './permission.schema';
const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type messageCrud {
    succes: Boolean
    message: String
  }

  type Mutation {
    _: String
  }
`;

export const typeDefs = [
  rootTypeDefs,
  AuthTypeDefs,
  UsertypeDefs,
  BlogtypeDefs,
  RolesTypeDefs,
  PermissionTypeDefs
];
export const resolvers = [
  AuthResolvers,
  UserResolvers,
  BlogResolvers,
  RolResolvers,
  PermissionResolvers
];
