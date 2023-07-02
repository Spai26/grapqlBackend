import {
  authAttachPermission,
  authDeletePermission,
  authUpdatePermission
} from '@controllers/auth/auth.permission.controller';
import { showlist } from '@helpers/querys/generalConsult';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';

export const PermissionResolvers = {
  Query: {
    getAllPermision: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (_, __, context) => {
          return await showlist('permission');
        })
      )
    )
  },
  Mutation: {
    createNewPermission: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { input }, context) => {
            return await authAttachPermission(input);
          }
        )
      )
    ),
    updateOnePermission: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { input }, context) => {
            return await authUpdatePermission(input);
          }
        )
      )
    ),

    deletePermissionWithRelation: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (_: any, { id }, context) => {
          return authDeletePermission(id);
        })
      )
    )
  }
};
