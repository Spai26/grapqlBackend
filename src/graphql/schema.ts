import gql from 'graphql-tag';

/**
 * * Private routes graphql
 */
import { UserTypeDefs, UserResolvers } from './private/user';
import { RolTypeDefs, RolResolvers } from './private/rol';
import { PermissionTypeDefs, PermissionResolvers } from './private/permission';

/**
 * * Public routes graphql
 */
import { AuthTypeDefs, AuthResolvers } from './auth';
const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  #message global
  type Response {
    success: Boolean
    message: String
  }
`;

export const typeDefs = [
  AuthTypeDefs,
  UserTypeDefs,
  RolTypeDefs,
  PermissionTypeDefs,
  rootTypeDefs
];

export const resolvers = [
  AuthResolvers,
  UserResolvers,
  RolResolvers,
  PermissionResolvers
];
