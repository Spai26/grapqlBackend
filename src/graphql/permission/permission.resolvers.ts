import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

import {
  authAttachPermission,
  authDeletePermission,
  authUpdatePermission
} from '@controllers/auth/auth.permission.controller';
import { showlist } from '@helpers/querys/generalConsult';

export const PermissionResolvers = {
  Query: {
    getAllPermision: async (_, __, { user }) => {
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
