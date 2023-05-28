import bcrypt from 'bcrypt';
import { Model, Schema, model } from 'mongoose';

interface IUser {
  name: String;
  username: String;
  email: String;
  phone: String;
  website?: String;
  password: String;
}

interface MUser extends Model<IUser> {
  encryptPassword(password: String): string;
  comparePassword(password: String): String;
}

const UserSchema = new Schema<IUser, MUser>(
  {
    name: { type: String, require: true },
    username: { type: String },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true },
    website: { type: String },
    password: { type: String, require: true }
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

export const UserModel = model<IUser, MUser>('User', UserSchema);
