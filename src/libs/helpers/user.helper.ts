import { UserModel } from '@models/nosql/user.models';

export const validateExisteEmail = async (email: String): Promise<Boolean> => {
  const isExist = await UserModel.findOne({ email: email });

  if (!isExist) {
    return false;
  }
  return true;
};
