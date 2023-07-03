import {
  createNewDocument,
  getModelByName
} from '@helpers/querys/generalConsult';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { CategoryModel } from '@models/nosql/category.models';
let result = null;

export const attachInDB = async (nameModel, values) => {
  const Model = getModelByName(nameModel);
  result = new Model(values);
  result = await result.save();
  return {
    message: `${nameModel} add!`,
    success: true
  };
};

export const attachCategoryinDB = async (input) => {
  try {
    let result = await createNewDocument(input, 'category');
    result = await result.save();
    return {
      message: 'Category add!',
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Error fn: attachCategory ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateCategoryinDB = async (input) => {
  try {
    const { id, name } = input;
    const updated = await CategoryModel.findByIdAndUpdate(id, {
      $set: {
        name
      }
    });

    result = await CategoryModel.updateSlug(id);

    if (updated && result) {
      return {
        message: 'field updated!',
        success: true
      };
    }
  } catch (error) {
    throw handlerHttpError(
      `Error fn: updateCategory ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const deleteCategoryinDB = async (input) => {
  return {
    message: 'esta pendiente',
    success: false
  };
};
