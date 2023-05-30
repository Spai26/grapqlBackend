import { Model } from 'mongoose';

export interface IUser {
  name: String;
  username: String;
  email: String;
  phone: String;
  website?: String;
  password: String;
  roles: String[];
}

export interface MUser extends Model<IUser> {
  encryptPassword(password: String): String;
  comparePassword(password: String, recivePassword: String): Boolean;
}
