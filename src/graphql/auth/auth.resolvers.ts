import { createAccesToken } from '@libs/generateJWT';
import { setAccessTokenCookie } from '@libs/accessWithCookie';
import { authLoginController } from '@controllers/auth/authSessions';

export const AuthResolvers = {
  Mutation: {
    AuthLogin: async (_: any, { input }, { res }) => {
      const { _id, rol } = await authLoginController(input);

      const mytoken = await createAccesToken({
        id: _id,
        rol
      });

      if (mytoken) {
        setAccessTokenCookie(res, mytoken);

        res.cookie('access-token', mytoken);
        return {
          mytoken,
          response: {
            message: 'Logued',
            success: true
          }
        };
      }
      return null;
    },

    authDisconnect: (_: any, __: any, { res }) => {
      res.cookie('token', '');
      return {
        response: {
          message: 'Good Bye!',
          success: false
        }
      };
    }
  }
};