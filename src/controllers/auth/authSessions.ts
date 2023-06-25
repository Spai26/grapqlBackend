import { existFields } from '@helpers/querys/generalConsult';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { UserModel } from '@models/nosql/user.models';

export const authLoginController = async (values) => {
  const { email, password } = values;

  try {
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

    return isValidUser;
  } catch (error) {
    throw handlerHttpError(
      `Error fn: login ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
