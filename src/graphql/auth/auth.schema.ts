import gql from 'graphql-tag';

export const AuthTypeDefs = gql`
  input AuthLogin {
    email: String!
    password: String!
  }

  type JwtToken {
    token: String!
  }

  type AuthResponse {
    message: Response
    mytoken: String!
  }

  extend type Mutation {
    AuthLogin(input: AuthLogin): AuthResponse
    authDisconnect: String!
  }
`;
