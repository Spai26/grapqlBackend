import { generateDocImage } from '@helpers/querys/Image.query';
import { createNewDocument } from '@helpers/querys/generalConsult';
import { ICtx, ROL, ResponseResult, listModel } from '@interfaces/index';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

/**
 * *  the function is to attach a single image to a blog post and save it in the database
 * @param values
 * @param context
 * @param modelname
 * @returns
 */
export const attachInDBwithSingleImage = async (
  values: any,
  ctx: ICtx,
  modelname: keyof listModel
): Promise<ResponseResult> => {
  const { id, alias } = ctx.user;
  const { title, body_content, front_image, status } = values;
  const { url, model_type } = front_image;

  try {
    //generate model_id
    const image = await generateDocImage({
      url,
      model_type,
      model_id: null,
      source: alias
    });

    //model_id reference blog._id

    const newvalue = await createNewDocument(
      {
        title,
        body_content,
        status,
        front_image: image._id,
        author: id,
        origin: alias
      },
      modelname
    );

    image.model_id = newvalue._id;

    await Promise.all([image.save(), newvalue.save()]);
    //save document on db

    return {
      message: 'create',
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in attachBlog function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
