import { UserModel } from '@models/nosql/user.models';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { showListRealTime } from '@helpers/querys/generalConsult';
import {
  attachUser,
  getUserForId,
  updateControllerUser
} from '@controllers/auth/auth.user.controller';

import {
  checkRolAndPermission,
  isAuth
} from '@libs/plugins/checkPermissionandRol';

export const UserResolvers = {
  Query: {
    getAllUsers: async (_, __, context) => {
      return await showListRealTime('user', 'rol', { virtual: true });
    },

    getUserbyId: async (_: any, { email }) => {
      return await getUserForId(email);
    }
  },
  Mutation: {
    createUser: async (_: any, { input }, { user }) => {
      isAuth(user);

      checkRolAndPermission(user.rol, 'created');

      return await attachUser(input);
    },

    updateUser: async (_: any, { input }: any, { user }) => {
      isAuth(user);
      return await updateControllerUser(input);
    },

    //eliminar los blogs relacionados por terminar
    deletedUser: async (_: any, { _id }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      const cleanUser = await UserModel.findByIdAndDelete(_id);

      return 'User Deleted';
    }
  }
};
