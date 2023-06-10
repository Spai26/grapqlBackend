import mongoose, { Schema, Document } from 'mongoose';

/*  */
enum imageTypes {
  GALLERY = 'gallery',
  Image = 'image'
}

export interface IImage {
  url: string;
  model_id: mongoose.Types.ObjectId;
  model_type: imageTypes;
}

export interface IImageDocument extends IImage, Document {}
