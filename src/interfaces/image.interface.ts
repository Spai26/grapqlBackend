import mongoose, { Schema, Document } from 'mongoose';

enum imageTypes {
  GALLERY = 'gallery',
  IMAGE = 'image'
}

export interface IImage {
  url: string;
  model_id: mongoose.Types.ObjectId;
  model_type: imageTypes;
  source: string;
}

export interface IImageDocument extends IImage, Document {}
