import mongoose, { Document } from 'mongoose';
import { IImage } from './image.interface';

export interface IBrand {
  title: string;
  sub_title: string;
  biografy: string;
  short_biografy: string;
  slug: string;
  logo: mongoose.Types.ObjectId; //ref 'image'
  galleries: mongoose.Types.DocumentArray<IImage>;
  source: string;
  collections?: string;
}

export interface IBrandDocument extends IBrand, Document {}
