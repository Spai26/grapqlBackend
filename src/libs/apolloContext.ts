import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { CheckVerifyToken } from '@middlewares/generateJWT';
import { JwtPayload } from 'jsonwebtoken';
import { isExistById } from '../helpers/querys/generalConsult';
import { optionUser } from '@utils/typesCustom';
import { Request, Response } from 'express';

export type BaseContext = {};

export interface MyContext {
  user?: BaseContext | string;
  req;
  res;
}

export const isAuthentificate = async (req: Request, res: Response) => {
  try {
    //Bearer token
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(' ').pop();

      if (!token) {
        throw handlerHttpError('Access no valid!', typesErrors.UNAUTHENTIFATED);
      }

      const verify_token: JwtPayload = await CheckVerifyToken(token);

      if (!verify_token || !verify_token.id) {
        throw handlerHttpError(
          'Invalid token payload!',
          typesErrors.UNAUTHENTIFATED
        );
      }

      const result = await isExistById(verify_token.id, 'user');

      const user: optionUser = {
        id: result._id,
        rol: result.rol
      };

      return user;
    }
  } catch (error) {
    throw handlerHttpError(
      'Error Access no valid.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};
