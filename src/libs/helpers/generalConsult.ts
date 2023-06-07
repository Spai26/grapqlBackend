import { PermisionModel } from '@models/nosql/permission.models';
import { RolModel } from '@models/nosql/roles.models';
import { UserModel } from '@models/nosql/user.models';

//base list
export type list = {};

export const validateExistenceData = async (params: string, model: string) => {
  const listExistData = {
    permission: await PermisionModel.findById(params),
    rol: await RolModel.findById(params)
  };

  return listExistData[model] || null;
};

export const showlist = async (model: string): Promise<string[]> => {
  const listArrayModels: list = {
    rol: await RolModel.find({}).populate('permissions'),
    permission: await PermisionModel.find({}),
    user: await UserModel.find({})
  };

  return listArrayModels[model] || null;
};
