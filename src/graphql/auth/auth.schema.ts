import gql from 'graphql-tag';
import { createAccesToken } from '@middlewares/generateJWT';
import { setAccessTokenCookie } from '@libs/accessWithCookie';
import { authLoginController } from '@controllers/auth/authSessions';

export const AuthTypeDefs = gql`
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
      const auth = await authLoginController(input);

      const mytoken = await createAccesToken({
        id: auth._id,
        rol: auth.rol
      });

      if (mytoken) {
        setAccessTokenCookie(res, mytoken);

        res.cookie('access-token', mytoken);
        return {
          mytoken,
          message: {
            message: 'Logued',
            success: true
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
