import { Document } from 'mongoose';
export interface IPermission {
  namePermission: string;
  description?: string;
}

export interface IPermisionDocument extends IPermission, Document {}
