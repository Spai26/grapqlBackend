import { Document } from 'mongoose';

export interface IRol {
  name: String;
}

export interface IRolDocument extends IRol, Document {}
