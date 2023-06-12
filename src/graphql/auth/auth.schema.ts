import gql from 'graphql-tag';
import { createAccesToken } from '@middlewares/jwt';
import { UserModel } from '@models/nosql/user.models';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import { existFields } from '@helpers/querys/generalConsult';
import { setAccessTokenCookie } from '@helpers/accessToken';

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
    message: messageCrud
    mytoken: String!
  }

  extend type Mutation {
    AuthLogin(input: AuthLogin): AuthResponse
    authDisconnect(text: String): String
  }
`;

export const AuthResolvers = {
  Mutation: {
    AuthLogin: async (_: any, { input }, { res }) => {
      const { email, password } = input;

      const isValidUser = await existFields('user', { email: email });

      if (!isValidUser) {
        throw handlerHttpError(
          'Invalid credentials, please verified.',
          typesErrors.NOT_FOUND
        );
      }

      const validPass = await UserModel.comparePassword(
        password,
        isValidUser.password
      );

      if (!validPass) {
        throw handlerHttpError(
          'Invalid credentials, please verified.',
          typesErrors.UNAUTHENTIFATED
        );
      }

      const mytoken = await createAccesToken({ id: isValidUser._id });

      if (mytoken) {
        setAccessTokenCookie(res, mytoken);

        res.cookie('access-token', mytoken);
        return {
          mytoken,
          message: {
            success: true,
            message: 'Logued'
          }
        };
      }
      return null;
    },

    authDisconnect: () => {
      //disconnect
    }
  }
};
