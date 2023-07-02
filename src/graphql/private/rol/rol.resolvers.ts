import {
  authDeleteRoles,
  updateRolesAndPermission
} from '@controllers/auth/auth.rol.controller';

import { showListRealTime } from '@helpers/querys/generalConsult';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';

export const RolResolvers = {
  Query: {
    getAllroles: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, __, context) => {
          return await showListRealTime('rol', 'permissions');
        })
      )
    )
  },

  Mutation: {
    updateArrayRolesWithPermissions: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { input }: any, context) => {
            return await updateRolesAndPermission(input);
          }
        )
      )
    ),

    deleteRoles: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(
          async (_: any, { id }: any, context) => {
            return await authDeleteRoles(id);
          }
        )
      )
    )
  }
};
