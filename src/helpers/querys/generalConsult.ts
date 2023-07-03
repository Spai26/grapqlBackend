import { IPropsTypes, listModel } from '@interfaces/index';

import {
  BlogModel,
  BrandModel,
  CategoryModel,
  ImageModel,
  PermisionModel,
  RolModel,
  TagModel,
  StoreModel,
  TestModel,
  UserModel
} from '@models/nosql';

import { Model as MongooseModel } from 'mongoose';

let Model;

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
export const getModelByName = (
  model: keyof listModel
): MongooseModel<any> | null => {
  const listModels: Record<keyof listModel, MongooseModel<any>> = {
    user: UserModel,
    blog: BlogModel,
    store: StoreModel,
    brand: BrandModel,
    rol: RolModel,
    permission: PermisionModel,
    image: ImageModel,
    tag: TagModel,
    category: CategoryModel,
    test: TestModel
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
  model: keyof listModel,
  values: IPropsTypes<string>
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
  model: keyof listModel,
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
export const createNewDocument = async (values, model: keyof listModel) => {
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
export const updateOneElement = async (id, values, model: keyof listModel) => {
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
  model: keyof listModel,
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
export const showlist = async (
  model: keyof listModel,
  options?: findOptions
) => {
  Model = getModelByName(model);
  return (await Model.find({})) || null;
};
