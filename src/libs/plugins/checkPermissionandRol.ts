import { isExistById } from '@helpers/querys/generalConsult';
import { IPermission } from '@interfaces/permission.interface';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

export const isAuthenticated = async (resolve, parent, args, context, info) => {
  const { user } = context;

  if (!user) {
    throw handlerHttpError('User dont register!', typesErrors.UNAUTHENTIFATED);
  }
  return resolve(parent, args, context, info);
  // Verificar si el usuario tiene el rol necesario
  /* const userRole = context.user.rol;
  console.log(userRole);
  if (!allowedRoles.includes(userRole)) {
    throw new Error(
      'No tienes los permisos necesarios para acceder a esta operación.'
    );
  }

  // Llamar a la siguiente función en la cadena de resolvers
  const result = await resolve(parent, args, context, info);
  return result; */
};

export const isAuth = (user) => {
  if (!user) {
    throw handlerHttpError('User dont register!', typesErrors.UNAUTHENTIFATED);
  }
  return user;
};

export const hasrol = (allowedRoles) => {
  console.log(allowedRoles);
};
export const hasPermission = () => {};

export const checkRolAndPermission = async (
  allowedRoles: string,
  Permission: string
) => {
  const rol = await isExistById(allowedRoles, 'rol', 'permissions');

  if (rol === null) {
    throw handlerHttpError(
      'You dont have Rol valid!',
      typesErrors.UNAUTHORIZED
    );
  }

  //const helper = await RolModel.find({}).populate('permissions');
  // Obtiene el valor de la propiedad namePermission de cada elemento []
  const listPermissionAccess = rol.permissions.map(
    (permission: IPermission) => permission.namePermission
  );

  if (!listPermissionAccess.includes(Permission)) {
    throw handlerHttpError(
      'You dont have Permission for this operation!',
      typesErrors.UNAUTHORIZED
    );
  }
};
