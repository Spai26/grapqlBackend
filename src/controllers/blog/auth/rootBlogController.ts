import { uploadImage } from '@helpers/generateImageUrl';
import {
  createNewDocument,
  getModelByName,
  isExistById
} from '@helpers/querys/generalConsult';
import { validExtensionImage } from '@helpers/validateExtension';
import { IBlog } from '@interfaces/blog.interface';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { ImageModel } from '@models/nosql/image.models';

let result;

let blog: IBlog | null;
const Model = getModelByName('blog');

export const rootNewBlogController = async (input) => {
  const { title, body_content, front_image, author, status } = input;
  const { url, model_type } = front_image;

  try {
    const exist = await isExistById(author, 'user');
    const imageExtension = validExtensionImage(url);

    if (!exist) {
      throw handlerHttpError('User no valid!', typesErrors.BAD_USER_INPUT);
    }

    if (!imageExtension) {
      throw handlerHttpError('Image no valid!', typesErrors.BAD_REQUEST);
    }
    //generalos url con cloduinary
    //ver si tendras opciones por defecto!
    const urlimage = await uploadImage(url);
    //creamos un documento par imagen
    const image = await createNewDocument(
      { url: urlimage, model_type, model_id: null },
      'image'
    );

    const newblog = await createNewDocument(
      {
        title,
        body_content,
        front_image: image._id,
        author,
        status
      },
      'blog'
    );

    newblog.origin = 'root';
    //vinculamos el blog con la imagen
    image.model_id = newblog._id;
    await image.save();
    let result = await newblog.save();

    return {
      message: 'root Blog agregate',
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Error fn: create root :${error}`,
      typesErrors.BAD_REQUEST
    );
  }
};

export const updateBlogController = async (id, input) => {
  try {
    blog = await isExistById(id, 'blog');

    let image = await ImageModel.findById(blog.front_image);

    image.url = input.front_image.url;
    image = await image.save();

    await Model.findByIdAndUpdate(
      id,
      {
        $set: {
          title: input.title,
          body_content: input.body_content,
          front_image: image.id,
          status: input.status
        }
      },
      { new: true }
    );
    /// result = await Model.updateSlug(id);

    if (image && result) {
      return {
        result,
        message: 'updated!',
        success: true
      };
    }
  } catch (error) {
    throw handlerHttpError(
      `Error fn: update root :${error}`,
      typesErrors.BAD_REQUEST
    );
  }
};
