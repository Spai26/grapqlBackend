import mongoose, { Document, Model } from 'mongoose';
import { IBrand } from './brand.interface';
import { IStore } from './store.interface';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  phone: string;
  website?: string;
  password: string;
  rol?: mongoose.Types.ObjectId; //ref 'rol'
  branchs?: mongoose.Types.DocumentArray<IBrand>;
  stores?: mongoose.Types.DocumentArray<IStore>;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string, recivePassword: string): Promise<boolean>;
}
