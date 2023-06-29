import gql from 'graphql-tag';

/**
 * * Private routes graphql
 */
import { UserTypeDefs, UserResolvers } from './user';
import { RolTypeDefs, RolResolvers } from './rol';
import { PermissionTypeDefs, PermissionResolvers } from './permission';

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
