import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import { UserModel } from '@models/nosql/user.models';

/**
 * * Validates if user exits in our data
 * @param email
 * @returns Boolean
 */
export const existUser = async (email: string): Promise<Boolean | null> => {
  const user = await UserModel.findById({ email: email });

  if (!user) {
    return null;
  }
  return true;
};

export const isExistUserTo = async (id: string): Promise<Object> => {
  const validUser = await UserModel.findById(id, {
    password: 0,
    email: 0
  });

  if (!validUser) {
    throw handlerHttpError('User not fount', typesErrors.NOT_FOUND);
  }

  const userValidToken = {
    id: validUser.id,
    roles: validUser.rol
  };

  return userValidToken;
};
