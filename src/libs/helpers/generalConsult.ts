import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import { PermisionModel } from '@models/nosql/permission.models';
import { RolModel } from '@models/nosql/roles.models';
import { UserModel } from '@models/nosql/user.models';

//base list
type list = {};

export const showlist = async (model: string): Promise<string[]> => {
  const listArrayModels: list = {
    rol: await RolModel.find({}).populate('permissions'),
    permission: await PermisionModel.find({}),
    user: await UserModel.find({})
  };

  return listArrayModels[model] || null;
};

export const assignPermissions = async (
  listpermissions: string[]
): Promise<string | boolean> => {
  //find all permissions[]
  const search_permissions_list = await PermisionModel.find({
    _id: { $in: listpermissions }
  });

  //convert to array list
  const extractIdSearch = search_permissions_list.map((p) => p._id.toString());

  //list is equal on search
  const isListEqual = listpermissions.every((p) => extractIdSearch.includes(p));

  if (!isListEqual) {
    throw handlerHttpError(
      'Permission no valid, please verified',
      typesErrors.BAD_REQUEST
    );
  }

  return isListEqual;
};

/* export const validateRolesExist = async (roles: String[]) => {
  const isExistRoles = await RolModel.find({ _id: { $in: roles } });

  const existingRoleIds = isExistRoles.map((role) => role._id.toString());

  const invalidRoleIds = roles.filter(
    (rolId: string) => !existingRoleIds.includes(rolId)
  );

  if (invalidRoleIds.length > 0) {
    throw new Error(`Invalid role name: ${invalidRoleIds.join(', ')}`);
  }
};
 */
