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
  PTagResolvers
} from './public';

const rootTypeDefs = gql`
  #search global
  #union SearchResult = SeacrhCategory | SearchTag

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

  #input for tag/category/permission/rol
  input NameOrDescInput {
    name: String!
    description: String
  }

  input NameAndDescPatchInput {
    id: ID!
    name: String!
    description: String
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
  PTagTypeDefs
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
  PTagResolvers
];
