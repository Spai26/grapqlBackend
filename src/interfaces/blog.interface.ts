import mongoose, { Model } from 'mongoose';
import { IUser } from './user.interface';

export interface IBlog {
  title: String;
  body_content: string;
  front_image: String;
  slug_title: String;
  count_view: Number;
  onwer: mongoose.Types.ObjectId | IUser;
}

export interface MBlog extends Model<IBlog> {
  incrementViewCount(): Number;
  updateSlug(id: String): String;
}
