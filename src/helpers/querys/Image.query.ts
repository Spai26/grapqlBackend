import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { createNewDocument } from './generalConsult';
import { validExtensionImage } from '@helpers/validateExtension';

/**
 *
 * @param values
 * @returns IImage
 */
export const validateAndCreateImage = async (values) => {
  const { url, model_type } = values;
  const imageExtension = validExtensionImage(url);

  if (!imageExtension) {
    throw handlerHttpError('Image no valid!', typesErrors.BAD_REQUEST);
  }

  const image = await createNewDocument(
    { url, model_type, model_id: null },
    'image'
  );

  return image;
};
