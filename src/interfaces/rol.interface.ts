import { Document } from 'mongoose';

export interface IRol {
  name: String;
  description?: String;
  permissions?: String[];
}

export interface IRolDocument extends IRol, Document {}
