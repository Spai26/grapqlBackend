import { handlerHttpError } from '@middlewares/handlerErrors';
import { BlogModel } from '@models/nosql/blog.models';
import { UserModel } from '@models/nosql/user.models';
import gql from 'graphql-tag';

export const BlogtypeDefs = gql`
  type Blog {
    id: ID
    title: String!
    body_content: String!
    front_image: String!
    slug_title: String
    count_view: Int
    createdAt: String
    updatedAt: String
    author: User!
  }

  extend type Query {
    allBlogs: [Blog]
  }

  extend type Mutation {
    createBlog(
      title: String
      body_content: String
      front_image: String
      author: ID
    ): Blog
  }
`;

export const BlogResolvers = {
  Query: {
    allBlogs: async () => await BlogModel.find({})
  },
  Mutation: {
    createBlog: async (_: any, args: any) => {
      const isExist = UserModel.findById(args.onwer);

      if (!isExist) {
        throw handlerHttpError('este usuario no existe o no esta autorizado');
      }

      const newBlog = new BlogModel({
        title: args.title,
        body_content: args.body_content,
        front_image: args.front_image,
        onwer: args.onwer
      });

      return newBlog.save().catch((error) => {
        throw handlerHttpError(`something unexpected happened, try again`);
      });
    }
  }
};
