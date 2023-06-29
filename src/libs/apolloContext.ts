import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { CheckVerifyToken } from '@middlewares/generateJWT';
import { JwtPayload } from 'jsonwebtoken';
import { isExistById } from '../helpers/querys/generalConsult';
import { optionUser } from '@utils/typesCustom';
import { NextFunction, Request, Response } from 'express';

export type BaseContext = {};

export interface MyContext {
  user?: BaseContext | string;
  req: Request;
  res: Response;
}

interface customRequest extends Request {
  user?: any;
}

export const isAuthentificate = async (req: customRequest, res: Response) => {
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

      req.user = user;

      return user;
    }
  } catch (error) {
    throw handlerHttpError(
      'Error Access no valid.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};
