import gql from 'graphql-tag';

export const BlogPrivateTypeDefs = gql`
  extend type Query {
    #para evitar errores
    getAllOnwerBlogs: [Blog]
    getOneBlogbyIdOnwer(id: ID!): Blog
  }
  extend type Mutation {
    attachNewBlog(input: addNewBlog): messageCrud
    updateMyBlog(id: ID!, input: rootUpdateMyBlog): messageCrud
    updateStatusBlog(id: ID!, status: Boolean!): messageCrud
    deleteMyBlog(id: ID!): messageCrud
  }

  input addNewBlog {
    title: String!
    body_content: String
    front_image: Image!
    author: ID!
    status: Boolean
  }

  input rootUpdateMyBlog {
    title: String
    body_content: String
    status: Boolean
    front_image: rootImage
  }

  input rootImage {
    url: String
  }
`;
