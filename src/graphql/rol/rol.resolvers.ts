import {
  authDeleteRoles,
  updateRolesAndPermission
} from '@controllers/auth/auth.rol.controller';

import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { showListRealTime } from '@helpers/querys/generalConsult';

export const RolResolvers = {
  Query: {
    getAllroles: async (_: any, __, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }

      //administrador  && rootadmin
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
