import slug from 'mongoose-slug-generator';
import { IStore, IStoreDocument } from '@interfaces/store.interface';
import mongoose, { Model, Schema, model } from 'mongoose';

mongoose.plugin(slug);

const Storechema = new Schema<IStoreDocument, Model<IStore>>(
  {
    title: { type: String, require: true, unique: true },
    sub_title: { type: String },
    slug: { type: String, slug: 'title' },
    description: { type: String, require: true },
    main_image: { type: Schema.Types.ObjectId, ref: 'Image', require: true },
    logo: { type: Schema.Types.ObjectId, ref: 'Image' },
    phone: { type: String, require: true },
    address: { type: String },
    positionX: { type: String },
    positionY: { type: String },
    region: { type: String },
    country: { type: String },
    url_video: { type: String },
    url_website: { type: String },
    email: { type: String, require: true },
    socials: [
      {
        name_social: { type: String },
        url: { type: String }
      }
    ],
    times_tables: {
      week_name: { type: String },
      open_time: { type: Date },
      close_time: { type: Date },
      open: { type: String }
    },
    onwer: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    galleries_image: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false
  }
);

export const StoreModel = model<IStoreDocument, Model<IStore>>(
  'Store',
  Storechema
);
