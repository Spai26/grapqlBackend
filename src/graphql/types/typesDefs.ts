import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    phone: String
    website: String
    password: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    hello: String
    allUsers: [User]
  }

  type Mutation {
    createUser(
      name: String
      username: String
      email: String
      phone: String
      website: String
      password: String
    ): User
    authConnect(email: String!, password: String!): String
    authDisconnect(text: String): String
  }
`;
