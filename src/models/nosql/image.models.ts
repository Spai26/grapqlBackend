import { IImageDocument } from '@interfaces/image.interface';
import { Schema, model } from 'mongoose';

const Imageschema = new Schema<IImageDocument>(
  {
    url: { type: String, require: true },
    model_id: { type: Schema.Types.ObjectId, require: true },
    model_type: { type: String, require: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const ImageModel = model<IImageDocument>('Image', Imageschema);
