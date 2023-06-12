import gql from 'graphql-tag';
import { UsertypeDefs, UserResolvers } from './user.schema';
import { AuthTypeDefs, AuthResolvers } from './auth/auth.schema';
import {
  BlogPublicTypeDefs,
  BlogPublicResolvers
} from './blog/blog.public.schema';
import {
  BlogPrivateResolvers,
  BlogPrivateTypeDefs
} from './blog/blog.private.schema';
import { RolesTypeDefs, RolResolvers } from './Roles.schema';
import { PermissionResolvers, PermissionTypeDefs } from './permission.schema';
import { ImageTypeDefs } from './Image.schema';

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
`;

export const typeDefs = [
  rootTypeDefs,
  AuthTypeDefs,
  UsertypeDefs,
  BlogPublicTypeDefs,
  BlogPrivateTypeDefs,
  RolesTypeDefs,
  PermissionTypeDefs,
  ImageTypeDefs
];
export const resolvers = [
  AuthResolvers,
  UserResolvers,
  BlogPublicResolvers,
  BlogPrivateResolvers,
  RolResolvers,
  PermissionResolvers
];
