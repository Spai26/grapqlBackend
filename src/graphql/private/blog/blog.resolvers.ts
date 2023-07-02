import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
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

export const BlogPrivateResolvers = {
  Query: {
    getAllOnwerBlogs: (_, __, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      //falta considerar origin or source
      return getAllBlogsWithRelations({ author: user.id });
    },
    getOneBlogbyIdOnwer: (_, { id }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return getBlogOnwer(id);
    }
  },
  Mutation: {
    attachNewBlog: async (_: any, { input }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }

      return await branchBlogController(user, input);
    },
    updateMyBlog: async (_: any, { id, input }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await updateBlogController(id, input);
    },
    updateStatusBlog: async (_: any, { id, status }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await updateStatusController(id, status);
    },

    deleteMyBlog: async (_: any, { id }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await deleteController(id);
    }
  }
};
