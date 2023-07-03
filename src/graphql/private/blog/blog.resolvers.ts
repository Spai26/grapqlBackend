import {
  branchBlogController,
  getAllBlogsWithRelations,
  getBlogOnwer
} from '@controllers/blog/blog.controller';
import { updateBlogController } from '@controllers/blog/auth/rootBlogController';
import {
  deleteController,
  updateStatusController
} from '@controllers/blog/auth/userAuthBlog.controller';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';

export const BlogPrivateResolvers = {
  Query: {
    getAllOnwerBlogs: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, __, context) => {
          const { id } = context.user;
          //falta considerar origin or source
          return getAllBlogsWithRelations({ author: id });
        })
      )
    ),
    getOneBlogbyIdOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, { id }, context) => {
          return getBlogOnwer(id);
        })
      )
    )
  },
  Mutation: {
    attachNewBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (_: any, { input }, context) => {
            const { user } = context.user;
            return await branchBlogController(user, input);
          }
        )
      )
    ),
    updateMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { id, input }, context) => {
            return await updateBlogController(id, input);
          }
        )
      )
    ),
    updateStatusBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { id, status }, context) => {
            return await updateStatusController(id, status);
          }
        )
      )
    ),

    deleteMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (_: any, { id }, context) => {
          return await deleteController(id);
        })
      )
    )
  }
};
