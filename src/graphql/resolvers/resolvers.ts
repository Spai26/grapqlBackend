import { IUser, UserModel } from '@models/nosql/user.models';
import token from '@middlewares/authToken';
import { handlerErrorAuth, handlerHttpError } from '@middlewares/handlerErrors';

export const resolvers = {
  Query: {
    hello: () => {
      'grapql';
    },
    allUsers: async () => await UserModel.find({})
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      const hashPassword = await UserModel.encryptPassword(args.password);

      const newuser = new UserModel({
        name: args.name,
        username: args.username,
        email: args.email,
        phone: args.phone,
        website: args.website,
        password: hashPassword
      });

      return newuser.save().catch((error) => {
        throw handlerHttpError(
          `something unexpected happened, try again ${error}`,
          'BAD_REQUEST',
          404
        );
      });
    },
    /* detailUser: async (_: any, args: any) => {},
    updateUser: async (_: any, args: any) => {},
    deletedUser: async (_: any, args: any) => {},
    searchforEmailorName: (_: any, args: any) => {},
    registerUser: async (_: any, args: any) => {}, */
    authConnect: async (_: any, args: any) => {
      const { email, password } = args;
      const isExist = await UserModel.findOne({ email });

      if (!isExist) {
        throw handlerErrorAuth('Invalid credentials, please verified.');
      }
      const validatePass = await UserModel.comparePassword(
        password,
        isExist.password
      );

      if (!validatePass) {
        throw handlerErrorAuth('Invalid credentials, please verified.');
      }

      const userForToken = {
        id: isExist._id
      };

      return token.generateToken(userForToken);
    },
    authDisconnect: () => {
      //disconnect
    }
  }
};
