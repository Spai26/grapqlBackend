import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, MUser } from '@interfaces/user.interface';

const UserSchema = new Schema<IUser, MUser>(
  {
    name: { type: String, require: true },
    username: { type: String },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true },
    website: { type: String },
    password: { type: String, require: true },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (
  password: string,
  recivePassword: String
) => {
  return await bcrypt.compare(password, recivePassword);
};

export const UserModel = model<IUser, MUser>('User', UserSchema);
export { IUser };
