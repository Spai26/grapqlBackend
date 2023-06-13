import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
  firstname: String;
  lastname: String;
  email: String;
  phone: String;
  website?: String;
  password: String;
  rol: mongoose.Types.ObjectId;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  encryptPassword(password: String): String;
  comparePassword(password: String, recivePassword: String): Boolean;
}
