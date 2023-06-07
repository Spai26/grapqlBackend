import { handlerHttpError } from '@middlewares/handlerErrors';
import { BlogModel } from '@models/nosql/blog.models';
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
    createBlog(title: String, body_content: String, front_image: String): Blog
  }
`;

export const BlogResolvers = {
  Query: {
    allBlogs: async () => await BlogModel.find({}).populate('author', 'name')
  },
  Mutation: {
    createBlog: async (_: any, args: any, { user }) => {
      const newBlog = new BlogModel({
        title: args.title,
        body_content: args.body_content,
        front_image: args.front_image,
        author: user.id
      });

      return await newBlog.save();
    }
  }
};
