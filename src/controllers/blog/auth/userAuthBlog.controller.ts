import { validateAndCreateImage } from '@helpers/querys/Image.query';
import {
  createNewDocument,
  getModelByName,
  isExistById
} from '@helpers/querys/generalConsult';
import { IBlog } from '@interfaces/blog.interface';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { ImageModel } from '@models/nosql/image.models';
const Model = getModelByName('blog');
let list;
let blog;
export const createBlogController = async (user, input) => {
  const { title, body_content, front_image, author, status } = input;

  try {
    const image = await validateAndCreateImage(front_image);
    const newblog = await createNewDocument(
      {
        title,
        body_content,
        front_image: image._id,
        author: user.id,
        status
      },
      'blog'
    );
    image.model_id = newblog._id;
    await image.save();
    await newblog.save();

    return {
      message: 'Blog created',
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Errro fn: create blog ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const onwerListBlogs = async (user): Promise<IBlog[]> => {
  try {
    list = await Model.find({ author: user.id })
      .populate({
        path: 'author',
        select: 'id email firstname lastname'
      })
      .populate('front_image', 'url');
    return list;
  } catch (error) {
    throw handlerHttpError(
      `Errro fn: onwerlistBlog ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateStatusController = async (id: string, status: boolean) => {
  try {
    list = await Model.findByIdAndUpdate(id, { status }, { new: true });

    if (list) {
      return {
        message: 'updated!',
        success: true
      };
    }
  } catch (error) {
    throw handlerHttpError(
      `Error fn: update status :${error}`,
      typesErrors.BAD_REQUEST
    );
  }
};

export const deleteController = async (id: string) => {
  try {
    blog = await isExistById(id, 'blog');
    //extrae el id de la imagen y eliminarla
    let image = blog.front_image;

    let result = await Model.deleteOne({ _id: id });

    if (result) {
      image = await ImageModel.deleteOne({ _id: image });

      if (image) {
        return {
          message: 'elimado completa',
          succes: true
        };
      }
    }

    console.log(image);
  } catch (error) {
    throw handlerHttpError(
      `Error fn: delete blog :${error}`,
      typesErrors.BAD_REQUEST
    );
  }
};
