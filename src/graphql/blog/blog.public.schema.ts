import { isExistById, showListRealTime } from '@helpers/generalConsult';

import gql from 'graphql-tag';

export const BlogPublicTypeDefs = gql`
  extend type Query {
    getpublicArrayBlogs: [Blog]
    getOneBlogbyId(id: ID!): Blog
  }

  type Blog {
    id: ID
    title: String!
    body_content: String!
    front_image: Image
    slug_title: String
    count_view: Int
    createdAt: String
    updatedAt: String
    author: User!
  }
`;

export const BlogPublicResolvers = {
  Query: {
    getpublicArrayBlogs: async () => {
      return await showListRealTime('blog', 'author', { virtual: true });
    },

    getOneBlogbyId: async (_: any, { id }) => {
      return await isExistById(id, 'blog', 'author');
    }
  }
};
