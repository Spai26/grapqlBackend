import {
  authDeleteRoles,
  updateRolesAndPermission
} from '@controllers/auth/auth.rol.controller';
import gql from 'graphql-tag';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { showListRealTime } from '@helpers/querys/generalConsult';

export const RolesTypeDefs = gql`
  extend type Query {
    getAllroles: [Rol]
  }

  extend type Mutation {
    updateArrayRolesWithPermissions(input: [arrayUpdateFields!]!): messageCrud
    deleteRoles(id: ID!): messageCrud
  }

  type Rol {
    id: ID
    name: String!
    description: String
    permissions: [Permision]
  }

  # solo aceptara ID existentes
  input arrayUpdateFields {
    id: ID!
    name: String
    description: String
    permissions: [ID]
  }
`;

export const RolResolvers = {
  Query: {
    getAllroles: async (_: any, __, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await showListRealTime('rol', 'permissions');
    }
  },
  Mutation: {
    updateArrayRolesWithPermissions: async (
      _: any,
      { input }: any,
      { user }
    ) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await updateRolesAndPermission(input);
    },
    deleteRoles: async (_: any, { id }: any, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }

      return await authDeleteRoles(id);
    }
  }
};
