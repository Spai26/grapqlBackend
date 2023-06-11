import {
  counterViews,
  showListWithTwoRelation
} from '@helpers/querys/Blog.query';

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
      return await showListWithTwoRelation('blog', 'author', 'front_image');
    },
    getOneBlogbyId: async (_: any, { id }) => {
      return await counterViews(id);
    }
  }
};
