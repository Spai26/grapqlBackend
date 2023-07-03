import { attachInDB } from '@controllers/auth/auth.category.controller';

import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';

export const TagResolvers = {
  Mutation: {
    newTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(async (_, { input }, context) => {
          return attachInDB('tag', input);
        })
      )
    ),
    updateTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { input }, context) => {
            return 'update';
          }
        )
      )
    ),

    deleteTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (_: any, { id }, context) => {
          return 'delete';
        })
      )
    )
  }
};
