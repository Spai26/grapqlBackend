import gql from 'graphql-tag';
import {
  getAllBlogsWithRelations,
  getBlogResulbyId,
  searchBlogsByTitle
} from '@controllers/blog/blog.controller';

export const PBlogPublicTypeDefs = gql`
  extend type Query {
    getpublicArrayBlogs: [Blog]
    getOneBlogbyId(id: ID!): Blog
    searchByTitle(title: String!): [Blog]
  }

  type Blog {
    id: ID
    title: String!
    body_content: String!
    front_image: Image!
    slug_title: String
    count_view: Int
    author: User!
    status: Boolean
    createdAt: String
    updatedAt: String
  }
`;

export const PBlogPublicResolvers = {
  Query: {
    getpublicArrayBlogs: async () => {
      return await getAllBlogsWithRelations();
    },
    getOneBlogbyId: async (_: any, { id }) => {
      return await getBlogResulbyId(id);
    },
    searchByTitle: async (_: any, { title }) => {
      return await searchBlogsByTitle(title);
    }
  }
};