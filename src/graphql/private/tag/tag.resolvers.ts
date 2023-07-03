import { createNewDocument } from '@helpers/querys/generalConsult';
import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';

export const TagResolvers = {
  Mutation: {
    newTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, { input }, { user }) => {
          let result = await createNewDocument(input, 'tag');
          result = await result.save();
          return {
            success: true,
            message: 'Tag add!'
          };
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
