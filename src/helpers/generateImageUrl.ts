import cloudinary from '@libs/cloudinary';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

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
