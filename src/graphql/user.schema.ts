import { gql } from 'graphql-tag';
import { RolModel } from '@models/nosql/roles.models';
import { UserModel } from '@models/nosql/user.models';
import { handlerHttpError } from '@middlewares/handlerErrors';

export const UsertypeDefs = gql`
  extend type Query {
    hello: String
    allUsers: [User]
    getUserbyId(_id: ID!): User
    roles: [Rol]
  }

  type User {
    id: ID
    name: String!
    username: String
    email: String!
    phone: String
    website: String
    password: String!
    roles: [Rol]
    createdAt: String
    updatedAt: String
  }

  type Rol {
    id: ID
    name: String!
  }

  extend type Mutation {
    createUser(
      name: String
      username: String
      email: String
      phone: String
      website: String
      password: String
      roles: ID
    ): User

    updateUser(
      _id: ID!
      name: String
      email: String
      username: String
      phone: String
      website: String
    ): messageCrud

    deletedUser(_id: ID!): String
  }
`;

export const UserResolvers = {
  Query: {
    hello: () => {
      'grapql';
    },
    allUsers: async () => await UserModel.find({}).populate('roles', 'name'),
    roles: async () => await RolModel.find({}),
    getUserbyId: async (_: any, { _id }) =>
      UserModel.findById(_id, {
        password: 0
      })
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      let assigRol: string;

      const hashPassword = await UserModel.encryptPassword(args.password);

      const newuser = new UserModel({
        name: args.name,
        username: args.username,
        email: args.email,
        phone: args.phone,
        website: args.website,
        password: hashPassword
      });

      //verificar que no tenga roles repetidos
      //valida cuando no pase rol
      if (args.roles) {
        assigRol = await RolModel.findById({ _id: args.roles });
      }
      newuser.roles = [...newuser.roles, assigRol];

      return newuser.save().catch((error) => {
        throw handlerHttpError(`something unexpected happened, try again`);
      });
    },

    updateUser: async (_: any, args: any) => {
      const upUser = await UserModel.updateOne(
        { _id: args._id },
        {
          $set: {
            name: args.name,
            username: args.username,
            phone: args.phone,
            website: args.website
          }
        }
      );

      if (!upUser) {
        throw handlerHttpError('the fields do not match, please verify');
      }

      return {
        succes: true,
        message: 'User updated!'
      };
    },

    deletedUser: async (_: any, { _id }) => {
      const cleanUser = await UserModel.findByIdAndDelete(_id);

      if (!cleanUser) {
        handlerHttpError('this user dont found');
      }

      return 'User Deleted';
    }
  }
};
