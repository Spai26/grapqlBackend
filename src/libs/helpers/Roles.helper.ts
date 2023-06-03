import { RolModel } from '@models/nosql/roles.models';

export const validateRolesExist = async (roles: String[]) => {
  const isExistRoles = await RolModel.find({ _id: { $in: roles } });

  const existingRoleIds = isExistRoles.map((role) => role._id.toString());

  const invalidRoleIds = roles.filter(
    (rolId: string) => !existingRoleIds.includes(rolId)
  );

  if (invalidRoleIds.length > 0) {
    throw new Error(`Invalid role name: ${invalidRoleIds.join(', ')}`);
  }
};
