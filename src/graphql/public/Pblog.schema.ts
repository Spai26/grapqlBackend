import gql from 'graphql-tag';

export const PBlogPublicTypeDefs = gql`
  extend type Query {
    getpublicArrayBlogs: [Blog]
    getOneBlogbyId(id: ID!): Blog
    searchByTitle(title: String!): [Blog]
  }
`;

export const PBlogPublicResolvers = {
  Query: {
    getpublicArrayBlogs: async () => {
      return 'await getAllBlogsWithRelations()';
    },
    getOneBlogbyId: async (_: any, { id }) => {
      return 'await getBlogResulbyId(id)';
    },
    searchByTitle: async (_: any, { title }) => {
      return 'await searchBlogsByTitle(title)';
    }
  }
};
