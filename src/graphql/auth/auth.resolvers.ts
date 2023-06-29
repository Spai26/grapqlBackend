import { createAccesToken } from '@middlewares/generateJWT';
import { setAccessTokenCookie } from '@libs/accessWithCookie';
import { authLoginController } from '@controllers/auth/authSessions';

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

    authDisconnect: (_: any, __: any, { res }) => {
      res.cookie('token', '');
      return 'Good Bye!';
    }
  }
};
