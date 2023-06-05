import { handlerHttpError } from '@middlewares/handlerErrors';
import { CheckVerifyToken } from '@middlewares/authToken';
import { isExistUserTo } from './user.helper';
import { JwtPayload } from 'jsonwebtoken';

export const getUserToken = async (req) => {
  try {
    if (req.headers.authorization) {
      //Bearer token
      const token: string = req.headers.authorization.split(' ').pop();

      if (!token) {
        throw handlerHttpError('ACCESS_NO_VALID!');
      }

      const verify_token: JwtPayload = await CheckVerifyToken(token);

      if (!verify_token || !verify_token.id) {
        throw handlerHttpError('Invalid token payload!');
      }

      const user = await isExistUserTo(verify_token.id);

      return { user };
    }
    return null;
  } catch (error) {
    throw handlerHttpError(error);
  }
};
