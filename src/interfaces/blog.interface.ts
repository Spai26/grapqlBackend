import mongoose, { Document, Model } from 'mongoose';
import { IUser } from './user.interface';

export interface IBlog {
  title: String;
  body_content: string;
  front_image: String;
  slug_title: String;
  count_view: Number;
  author: mongoose.Types.ObjectId | IUser;
}

export interface IBlogDocument extends IBlog, Document {}

export interface IBlogModel extends Model<IBlogDocument> {
  incrementViewCount(): Number;
  updateSlug(id: String): String;
}
