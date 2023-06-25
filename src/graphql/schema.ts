import gql from 'graphql-tag';
import { UsertypeDefs, UserResolvers } from './private/user.schema';
import { AuthTypeDefs, AuthResolvers } from './auth/auth.schema';
import { BlogPublicTypeDefs, BlogPublicResolvers } from './public/blog.schema';
import {
  BlogPrivateResolvers,
  BlogPrivateTypeDefs
} from './private/blog.schema';
import { RolesTypeDefs, RolResolvers } from './private/Roles.schema';
import {
  PermissionResolvers,
  PermissionTypeDefs
} from './private/permission.schema';
import { ImageResolvers, ImageTypeDefs } from './private/Image.schema';
import {
  StorePublicResolvers,
  StorePublicTypeDefs
} from './public/store.scchema';
import { TagResolvers, TagTypeDefs } from './public/tag.schema';
import { CategoryResolvers, CategoryTypeDefs } from './public/category.schema';

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type messageCrud {
    success: Boolean
    message: String
  }

  input generalValues {
    name: String!
  }
`;

export const typeDefs = [
  rootTypeDefs,
  AuthTypeDefs,
  UsertypeDefs,
  /* BlogPublicTypeDefs,
  BlogPrivateTypeDefs, */
  RolesTypeDefs,
  PermissionTypeDefs,
  /* StorePublicTypeDefs, */
  ImageTypeDefs,
  TagTypeDefs,
  CategoryTypeDefs
];
export const resolvers = [
  AuthResolvers,
  UserResolvers,
  /*  BlogPublicResolvers,
  BlogPrivateResolvers, */
  RolResolvers,
  PermissionResolvers,
  /* StorePublicResolvers, */
  TagResolvers,
  CategoryResolvers,
  ImageResolvers
];
