import { IUserDocument } from '@interfaces/user.interface';
import { RolModel } from '@models/nosql/roles.models';
import { UserModel } from '@models/nosql/user.models';

export const createUser = async (): Promise<IUserDocument> => {
  try {
    const count = await UserModel.estimatedDocumentCount();
    const rol = await RolModel.findOne({ name: process.env.ROOTROL });

    if (count > 0) return;
    const value = new UserModel({
      firstname: process.env.ROOTNAME,
      lastname: process.env.ROOTLAST,
      username: process.env.ROOTROL,
      email: process.env.ROOTEMAIL,
      password: process.env.ROOTPASSWORD,
      rol: rol._id
    });

    setTimeout(async () => {
      await value.save();
      console.log(value);
    }, 5000);
  } catch (error) {
    console.error(error);
  }
};
