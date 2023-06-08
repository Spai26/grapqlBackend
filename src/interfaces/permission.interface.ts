import { Document } from 'mongoose';
export interface IPermission {
  name: String;
  description?: String;
}

export interface IPermisionDocument extends IPermission, Document {}
