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
  TagResolvers,
  BlogResolvers,
  BlogTypeDefs,
  StoreResolvers,
  StoreTypeDefs,
  //
  ImageResolvers,
  ImageTypeDefs
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
  GeneralTypeDefs,
  PBlogTypeDefs,
  PBlogResolvers,
  PStoreTypeDefs,
  PStoreResolvers
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
  BlogTypeDefs,
  StoreTypeDefs,
  //
  ImageTypeDefs,
  //
  PCategoryTypeDefs,
  PTagTypeDefs,
  PBlogTypeDefs,
  GeneralTypeDefs,
  PStoreTypeDefs
];

export const resolvers = [
  AuthResolvers,
  UserResolvers,
  RolResolvers,
  PermissionResolvers,
  CategoryResolvers,
  TagResolvers,
  BlogResolvers,
  StoreResolvers,
  //
  ImageResolvers,
  //
  PCategoryResolvers,
  PTagResolvers,
  PBlogResolvers,
  PStoreResolvers
];
