import gql from 'graphql-tag';
import token from '@middlewares/authToken';
import { UserModel } from '@models/nosql/user.models';
import { handlerErrorAuth } from '@middlewares/handlerErrors';

export const AuthTypeDefs = gql`
  extend type Mutation {
    authConnect(email: String!, password: String!): String
    authDisconnect(text: String): String
  }
`;

export const AuthResolvers = {
  Mutation: {
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
