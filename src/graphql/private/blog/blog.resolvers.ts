import { deleteController } from '@controllers/blog/auth/userAuthBlog.controller';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import {
  PERMISSIONS,
  ROL,
  ResponseResult
} from '@interfaces/types/type.custom';
import {
  createNewDocument,
  getModelByName
} from '@helpers/querys/generalConsult';
import { attachInDBwithSingleImage } from '@controllers/auth/auth.blog.controller';
import { BlogModel } from '@models/nosql';

export const BlogResolvers = {
  Query: {
    getAllOnwerBlogs: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, __, context) => {
          const { id } = context.user;
          //falta considerar origin or source
          return BlogModel.find({}).populate('front_image').populate('author');
        })
      )
    ),
    getOneBlogbyIdOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, { id }, context) => {
          return ' here' /* getBlogOnwer(id) */;
        })
      )
    )
  },
  Mutation: {
    newBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (_: any, { input }, context) => {
            return attachInDBwithSingleImage(input, context, 'blog');
          }
        )
      )
    ),
    updateMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { id, input }, context) => {
            return 'here'; /* await updateBlogController(id, input); */
          }
        )
      )
    ),
    updateStatusBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { id, status }, context) => {
            return 'here'; /* await updateStatusController(id, status); */
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
