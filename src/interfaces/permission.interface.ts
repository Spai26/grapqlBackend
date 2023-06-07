import { Document } from 'mongoose';
export interface IPermission {
  name: String;
}

export interface IPermisionDocument extends IPermission, Document {}
