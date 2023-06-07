import { RolModel } from '@models/nosql/roles.models';
import { assignPermissions } from './generalConsult';

export const existRole = async (rolID: string): Promise<Boolean | null> => {
  const isExistRoles = await RolModel.findById(rolID);

  if (!isExistRoles) {
    return null;
  }
  return true;
};

export const checkArrayElement = (elements) => {
  if (Array.isArray(elements) && elements.length > 0) {
    return true;
  }
};

export const updateOneElement = async (id, values) => {
  await RolModel.updateOne({ _id: id }, values);
  return true;
};

export const updateElement = async (elements) => {
  const { id, name, description, permissions } = elements;
  if (Array.isArray(permissions) && permissions.length > 0) {
    const valid_Array_Permission = await assignPermissions(permissions);
    if (valid_Array_Permission) {
      await RolModel.findByIdAndUpdate(id, {
        name,
        description,
        permissions
      });
    }
  }

  await RolModel.findByIdAndUpdate(id, { name, description });

  return true;
};
