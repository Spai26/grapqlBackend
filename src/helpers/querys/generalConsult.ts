import {
  IBlog,
  IBrand,
  ICategory,
  IImage,
  IPermission,
  IRol,
  IStore,
  ITag,
  IUser
} from '@interfaces/index';
import { ITest } from '@interfaces/testing';
import { BlogModel } from '@models/nosql/blog.models';
import { BrandModel } from '@models/nosql/brand.models';
import { CategoryModel } from '@models/nosql/category.models';
import { ImageModel } from '@models/nosql/image.models';
import { PermisionModel } from '@models/nosql/permission.models';
import { RolModel } from '@models/nosql/roles.models';
import { StoreModel } from '@models/nosql/store.models';
import { TagModel } from '@models/nosql/tag.models';
import { TestModel } from '@models/nosql/testing.models';
import { UserModel } from '@models/nosql/user.models';
import { searchOptions } from '@utils/typesCustom';

let Model;

export interface list {}

export interface findOptions {
  password?: number;
  virtual?: boolean;
  email?: string | number;
  website?: number;
  phone?: number;
  author?: string;
}

/**
 * * list of models created
 * @param model
 * @returns
 */

export const getModelByName = (model: string) => {
  //object
  const listModels: list = {
    user: UserModel<IUser>,
    blog: BlogModel<IBlog>,
    store: StoreModel<IStore>,
    brand: BrandModel<IBrand>,
    rol: RolModel<IRol>,
    permission: PermisionModel<IPermission>,
    image: ImageModel<IImage>,
    tag: TagModel<ITag>,
    category: CategoryModel<ICategory>,
    test: TestModel<ITest>
  };

  //function
  return listModels[model] || null;
};

/**
 * !Model query User.
 * * I get the first element it finds in my model
 * @param model
 * @param value
 * @returns Object existing
 */
export const existFields = async (
  model: string,
  values: searchOptions<string>
) => {
  Model = getModelByName(model);
  return await Model.findOne(values);
};

/**
 * !Model query General.
 * * check if the id exists in the db you can pass it options
 * @param id
 * @param model
 * @param options
 * ?              is optional
 * @returns object existing or null
 */
export const isExistById = async (
  id: string,
  model: string,
  relation?: string,
  options?: findOptions
) => {
  Model = getModelByName(model);
  return (await Model.findById(id, options).populate(relation)) || null;
};

/**
 * !Model query General.
 * * this function helps me to generate a new instance for my ]* * document
 * @param values
 * @param model
 * @returns
 */
export const createNewDocument = async (values, model: string) => {
  Model = getModelByName(model);
  return new Model(values) || null;
};

/**
 * !Model query General.
 * * This function helps me update a record using the id
 * @param id
 * @param values
 * @param model
 * @returns query
 */
export const updateOneElement = async (
  id: searchOptions<string>,
  values,
  model: string
) => {
  Model = getModelByName(model);
  return (await Model.updateOne(id, values)) || null;
};

/**
 * * This function shows me the real data found in the database
 * * with relation one level
 * @param model
 * @param relation
 * @param options reference findoptions
 * @returns
 */
export const showListRealTime = async (
  model: string,
  relation: string,
  options?: findOptions
) => {
  Model = getModelByName(model);
  return await Model.find({}).populate({
    path: relation,
    options
  });
};

/**
 * !Model query General
 * * this function shows me the complete record of the document
 * @param model
 * @returns query
 */
export const showlist = async (model: string, options?: findOptions) => {
  Model = getModelByName(model);
  return (await Model.find({})) || null;
};
