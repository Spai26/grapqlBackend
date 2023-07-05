import { createNewDocument } from './generalConsult';

import { IImageDocument } from '@interfaces/image.interface';

/**
 *
 * @param values
 * @returns IImage
 */
export const generateDocImage = async (values): Promise<IImageDocument> => {
  const image = await createNewDocument(values, 'image');
  return image;
};
