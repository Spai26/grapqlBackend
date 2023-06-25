import { gql } from 'apollo-server-express';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import { showlist } from '@helpers/querys/generalConsult';
import {
  authAttachPermission,
  authDeletePermission,
  authUpdatePermission
} from '@controllers/auth/auth.permission.controller';
import { MyContext } from '@helpers/context';

export const PermissionTypeDefs = gql`
  extend type Query {
    getAllPermision: [Permision]
  }

  extend type Mutation {
    createNewPermission(input: createNewPermission): messageCrud
    updateOnePermission(input: updateField!): messageCrud
    deletePermissionWithRelation(id: [ID!]!): messageCrud
  }

  type Permision {
    id: ID
    name: String
    description: String
  }

  input createNewPermission {
    name: String!
    description: String
  }

  #ID requerido para validacion
  input updateField {
    id: ID!
    name: String
    description: String
  }
`;

export const PermissionResolvers = {
  Query: {
    getAllPermision: async (_, __, { user }: MyContext) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await showlist('permission');
    }
  },
  Mutation: {
    createNewPermission: async (_: any, { input }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await authAttachPermission(input);
    },

    updateOnePermission: async (_: any, { input }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await authUpdatePermission(input);
    },

    deletePermissionWithRelation: async (_: any, { id }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return authDeletePermission(id);
    }
  }
};