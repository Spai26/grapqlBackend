import gql from 'graphql-tag';
import { generateToken } from '@middlewares/authToken';
import { UserModel } from '@models/nosql/user.models';
import { handlerErrorAuth } from '@middlewares/handlerErrors';

export const AuthTypeDefs = gql`
  directive @skipAuth on FIELD_DEFINITION
  input AuthLogin {
    email: String!
    password: String!
  }

  type JwtToken {
    token: String!
  }

  type AuthResponse {
    userForToken: UserForToken!
    getoken: String!
  }

  type UserForToken {
    id: ID!
  }
  extend type Mutation {
    AuthLogin(input: AuthLogin): AuthResponse @skipAuth
    authDisconnect(text: String): String
  }
`;

export const AuthResolvers = {
  Mutation: {
    AuthLogin: async (_: any, { input }) => {
      const { email, password } = input;

      const isValidUser = await UserModel.findOne({ email });

      if (!isValidUser) {
        throw handlerErrorAuth('Invalid credentials, please verified.');
      }

      const validPass = await UserModel.comparePassword(
        password,
        isValidUser.password
      );

      if (!validPass) {
        throw handlerErrorAuth('Invalid credentials, please verified.');
      }

      const userForToken = {
        id: isValidUser.id
      };

      const getoken = await generateToken({ id: userForToken.id });

      return {
        userForToken,
        getoken
      };
    },

    authDisconnect: () => {
      //disconnect
    }
  }
};
