import gql from 'graphql-tag';

export const BlogTypeDefs = gql`
  extend type Query {
    #para evitar errores
    getAllOnwerBlogs: [Blog]
    getOneBlogbyIdOnwer(id: ID!): Blog
  }
  extend type Mutation {
    newBlog(input: blogCreationInput): Response
    updateMyBlog(id: ID!, input: blogCreationInput): Response
    updateStatusBlog(id: ID!, status: Boolean!): Response
    deleteMyBlog(id: ID!): Response
  }

  type SearchBlog {
    title: String!
  }

  #model Blog
  type Blog {
    id: ID
    title: String!
    body_content: String!
    front_image: Image! #change for string
    slug_title: String
    count_view: Int
    author: UserView!
    status: Boolean
    origin: String
    createdAt: String
    updatedAt: String
  }

  type UserView {
    id: ID
    username: String
  }

  #slug / origin / author autogenerate
  input blogCreationInput {
    title: String!
    body_content: String
    front_image: ImageInput!
    status: Boolean
  }
`;
