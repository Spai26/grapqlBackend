import mongoose, { Document, Model } from 'mongoose';
import { IBranch } from './branch.interface';
import { IStore } from './store.interface';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  website?: string;
  password: string;
  rol?: mongoose.Types.ObjectId;
  branchs?: mongoose.Types.DocumentArray<IBranch>;
  stores?: mongoose.Types.DocumentArray<IStore>;
}
//methods
export interface IUserDocument extends IUser, Document {}

//static
export interface IUserModel extends Model<IUserDocument> {
  encryptPassword(password: String): String;
  comparePassword(password: String, recivePassword: String): Boolean;
}
