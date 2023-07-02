import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_PASS
} from '@config/variables';

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_PASS
});

export default cloudinary;
