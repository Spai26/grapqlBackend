import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    createUser(
      name: String
      username: String
      email: String
      phone: String
      website: String
      passsword: String
    ): User
  }

  type User {
    id: ID
    name: String
    username: String
    email: String
    phone: String
    website: String
    password: String
  }
`;
