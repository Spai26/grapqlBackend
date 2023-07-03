import { getModelByName } from '@helpers/querys/generalConsult';
import { IPropsTypes, ResponseResult, listModel } from '@interfaces/index';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { generateSlug } from '@utils/funcitonHelpers';

let result = null;

export const attachInDB = async (
  nameModel: keyof listModel,
  values: IPropsTypes<string>
): Promise<ResponseResult> => {
  try {
    const Model = getModelByName(nameModel);
    result = new Model(values);

    result = await result.save();
    return {
      message: `${nameModel} add!`,
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in attach function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

/**
 * !This function only updates the name and slug fields for the category-tag models
 * @param id
 * @param name
 * ? if the model has slug it will modify it
 * @can Tag - Category
 */
export const updateNameWithSlugInDB = async (
  nameModel: keyof listModel,
  values: IPropsTypes<string>
): Promise<ResponseResult> => {
  try {
    const { id, name } = values;
    const Model = getModelByName(nameModel);

    await Model.findByIdAndUpdate(id, {
      $set: {
        name,
        slug: generateSlug(name)
      }
    });

    return { message: `${nameModel} field updated!`, success: true };
  } catch (error) {
    throw handlerHttpError(
      `Error in update function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const deleteInDB = async (
  nameModel: keyof listModel,
  id: string
): Promise<ResponseResult> => {
  try {
    return {
      message: ' in progress',
      success: false
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in delete function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
