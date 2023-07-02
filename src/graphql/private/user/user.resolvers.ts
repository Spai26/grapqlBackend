import { showListRealTime } from '@helpers/querys/generalConsult';
import {
  attachUserInDB,
  deleteWithAllRelations,
  getUserForId,
  updateControllerUser
} from '@controllers/auth/auth.user.controller';
import {
  hasRol,
  hasPermission,
  authMiddleware
} from '@middlewares/access/index';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';

export const UserResolvers = {
  Query: {
    getAllUsers: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, __, context) => {
          return await showListRealTime('user', 'rol', { virtual: true });
        })
      )
    ),

    searchUserforEmail: async (_: any, { email }) => {
      return await getUserForId(email);
    }
  },

  Mutation: {
    createUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (_: any, { input }, context) => {
            return await attachUserInDB(input);
          }
        )
      )
    ),

    updateUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { input }: any, context) => {
            return await updateControllerUser(input);
          }
        )
      )
    ),

    //eliminar los blogs relacionados por terminar
    deletedUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (_: any, { id }, context) => {
          return deleteWithAllRelations(id);
        })
      )
    )
  }
};
