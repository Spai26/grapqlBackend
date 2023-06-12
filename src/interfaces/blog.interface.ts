import mongoose, { Document, Model } from 'mongoose';

export interface IBlog {
  title: String;
  body_content: String;
  front_image: mongoose.Types.ObjectId;
  slug_title: String;
  count_view: Number;
  author: mongoose.Types.ObjectId;
  status: Boolean;
  origin: String;
}

export interface IBlogDocument extends IBlog, Document {}

export interface IBlogModel extends Model<IBlogDocument> {
  updateSlug(id: String): String;
}
