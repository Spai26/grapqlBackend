import * as jwt from 'jsonwebtoken';
import { handlerHttpError, typesErrors } from './handlerErrorsApollo';
import { optionUser } from '@utils/typesCustom';

let token: string | jwt.JwtPayload;

export const createAccesToken = ({ id, rol }: optionUser): string => {
  try {
    token = jwt.sign({ id, rol }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES
    });
  } catch (error) {
    throw handlerHttpError(
      'Error generating token.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }

  return token;
};

export const CheckVerifyToken = (
  valuetoken: string
) /* : Promise<jwt.JwtPayload> */ => {
  try {
    if (valuetoken) {
      token = jwt.verify(valuetoken, process.env.ACCESS_TOKEN_SECRET);

      return token as jwt.JwtPayload;
    }
  } catch (error) {
    throw handlerHttpError(
      'Error this token no valid.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};
