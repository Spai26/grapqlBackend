import gql from 'graphql-tag';
import token from '@middlewares/authToken';
import { UserModel } from '@models/nosql/user.models';
import { handlerErrorAuth } from '@middlewares/handlerErrors';

export const AuthTypeDefs = gql`
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
    AuthLogin(input: AuthLogin): AuthResponse
    authConnect(email: String!, password: String!): String
    authDisconnect(text: String): String
  }
`;

export const AuthResolvers = {
  Mutation: {
    AuthLogin: async (_: any, { input }) => {
      const { email, password } = input;

      const isValid = await UserModel.findOne({ email });

      if (!isValid) {
        throw handlerErrorAuth('Invalid credentials, please verified.');
      }

      const validPass = await UserModel.comparePassword(
        password,
        isValid.password
      );

      if (!validPass) {
        throw handlerErrorAuth('Invalid credentials, please verified.');
      }
      const userForToken = {
        id: isValid._id
      };
      const getoken = token.generateToken(input);
      return {
        userForToken,
        getoken
      };
    },

    authConnect: async (_: any, args: any) => {
      const { email, password } = args;
      const isExist = await UserModel.findOne({ email });

      if (!isExist) {
        throw handlerErrorAuth('Invalid credentials, please verified.');
      }
      const validatePass = await UserModel.comparePassword(
        password,
        isExist.password
      );

      if (!validatePass) {
        throw handlerErrorAuth('Invalid credentials, please verified.');
      }

      const userForToken = {
        id: isExist._id
      };

      return token.generateToken(userForToken);
    },

    authDisconnect: () => {
      //disconnect
    }
  }
};
