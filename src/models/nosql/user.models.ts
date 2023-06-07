import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUserDocument, IUserModel } from '@interfaces/user.interface';

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, default: null },
    website: { type: String, default: null },
    password: { type: String, require: true },
    rol: { type: Schema.Types.ObjectId, ref: 'Role' }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.statics.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (
  password: string,
  recivePassword: string
) => {
  return await bcrypt.compare(password, recivePassword);
};

export const UserModel = model<IUserDocument, IUserModel>('User', UserSchema);
