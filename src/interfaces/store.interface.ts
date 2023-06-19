import mongoose, { Document } from 'mongoose';
import { IImage } from './image.interface';
import { ITag } from './tag.interfaces';
import { ICategory } from './category.interface';

export interface IStore {
  title: string;
  sub_title: string;
  slug: string;
  description: string;
  main_image: mongoose.Types.ObjectId; //ref 'img'
  logo?: mongoose.Types.ObjectId; //ref 'img'
  galleries_image?: mongoose.Types.DocumentArray<IImage>; //ref 'img'
  phone: string;
  address: string;
  positionX: string;
  positionY: string;
  region: string;
  country?: string;
  url_video?: string;
  url_website?: string;
  email: string;
  socials?: Social[];
  times_tables: Times[];
  onwer: mongoose.Types.ObjectId; //ref 'user'
  tags?: mongoose.Types.DocumentArray<ITag>; //ref 'tags'
  categories?: mongoose.Types.DocumentArray<ICategory>;
}

interface Times {
  week_name: string;
  open_time: string;
  close_time: string;
  open: boolean;
}

interface Social {
  name_social: string;
  url: string;
}

export interface IStoreDocument extends IStore, Document {}
