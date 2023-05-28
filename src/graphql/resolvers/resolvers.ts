import { UserModel } from '@models/index';

export const resolvers = {
  Query: {
    hello: () => {
      'grapql';
    }
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      const hashPassword = await UserModel.encryptPassword(args.passsword);
      const newuser = new UserModel({
        name: args.name,
        username: args.username,
        email: args.email,
        phone: args.phone,
        website: args.website,
        password: hashPassword
      });

      await newuser.save();
      return newuser;
    }
  }
};
