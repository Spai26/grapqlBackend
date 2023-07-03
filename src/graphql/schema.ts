import gql from 'graphql-tag';

/**
 * * Private routes graphql
 */
import {
  UserResolvers,
  UserTypeDefs,
  RolResolvers,
  RolTypeDefs,
  PermissionTypeDefs,
  PermissionResolvers,
  CategoryResolvers,
  CategoryTypeDefs,
  TagTypeDefs,
  TagResolvers
} from './private';

/**
 * * Public routes graphql
 */
import { AuthTypeDefs, AuthResolvers } from './auth';
import {
  PCategoryTypeDefs,
  PCategoryResolvers,
  PTagTypeDefs,
  PTagResolvers,
  GeneralResolvers,
  GeneralTypeDefs
} from './public';

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export const typeDefs = [
  rootTypeDefs,
  AuthTypeDefs,
  UserTypeDefs,
  RolTypeDefs,
  PermissionTypeDefs,
  CategoryTypeDefs,
  TagTypeDefs,

  //
  PCategoryTypeDefs,
  PTagTypeDefs,
  GeneralTypeDefs
];

export const resolvers = [
  AuthResolvers,
  UserResolvers,
  RolResolvers,
  PermissionResolvers,
  CategoryResolvers,
  TagResolvers,
  //
  PCategoryResolvers,
  PTagResolvers,
  GeneralResolvers
];
