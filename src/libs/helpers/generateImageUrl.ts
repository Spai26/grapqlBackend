import cloudinary from '@config/cloudinary';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';

interface options {}
export const uploadImage = async (path: string) => {
  try {
    const { url } = await cloudinary.uploader.upload(path);
    return url;
  } catch (error) {
    throw handlerHttpError(
      'Error cloudinary dont upload image.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};
