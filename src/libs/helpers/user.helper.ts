import { handlerHttpError } from '@middlewares/handlerErrors';
import { UserModel } from '@models/nosql/user.models';

export const validateExisteEmail = async (email: String): Promise<Boolean> => {
  const isExist = await UserModel.findOne({ email: email });

  if (!isExist) {
    return false;
  }
  return true;
};

export const isExistUserTo = async (id: string): Promise<Object> => {
  const validUser = await UserModel.findById(id, {
    password: 0,
    email: 0
  });

  if (!validUser) {
    throw handlerHttpError('User not fount');
  }

  const userValidToken = {
    id: validUser.id,
    roles: validUser.roles
  };

  return userValidToken;
};
