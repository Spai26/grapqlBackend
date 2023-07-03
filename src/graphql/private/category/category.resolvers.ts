import {
  attachCategoryinDB,
  deleteCategoryinDB,
  updateCategoryinDB
} from '@controllers/auth/auth.category.controller';
import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';

export const CategoryResolvers = {
  Mutation: {
    newCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)((_, { input }, context) => {
          return attachCategoryinDB(input);
        })
      )
    ),
    updatedCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (_, { input }, context) => {
          return await updateCategoryinDB(input);
        })
      )
    ),
    deletedCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (_, { input }, context) => {
          return await deleteCategoryinDB(input);
        })
      )
    )
  }
};
