import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID
    name: String!
    username: String
    email: String!
    phone: String
    website: String
    password: String!
    roles: [Rol]
    createdAt: String
    updatedAt: String
  }
  type Rol {
    id: ID
    name: String!
  }

  type Query {
    hello: String
    allUsers: [User]
    roles: [Rol]
  }

  type Mutation {
    createUser(
      name: String
      username: String
      email: String
      phone: String
      website: String
      password: String
      roles: String
    ): User
    authConnect(email: String!, password: String!): String
    authDisconnect(text: String): String
  }
`;
