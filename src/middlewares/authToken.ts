import * as jwt from 'jsonwebtoken';
import { handlerHttpError, typesErrors } from './handlerErrors';

export const generateToken = (user: { id: string }): String => {
  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  });

  return token;
};

export const CheckVerifyToken = async (
  token: string
): Promise<jwt.JwtPayload> => {
  try {
    if (token) {
      const valid = (await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      )) as jwt.JwtPayload;

      return valid;
    }
    throw handlerHttpError('TOKEN NO PROVIDED', typesErrors.UNAUTHENTIFATED);
  } catch (error) {
    throw handlerHttpError('THIS TOKEN NO VALID', typesErrors.UNAUTHENTIFATED);
  }
};
