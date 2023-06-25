import { gql } from 'graphql-tag';

import { UserModel } from '@models/nosql/user.models';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import {
  createNewDocument,
  isExistById,
  showListRealTime,
  updateOneElement
} from '@helpers/querys/generalConsult';

let result;
/**
 * !important: add ! if is required
 */
export const UsertypeDefs = gql`
  #Query consult list
  extend type Query {
    hello: String
    allUsers: [User]
    getUserbyId(id: ID!): User
  }
  #Mutation list
  extend type Mutation {
    createUser(input: createNewUser): messageCrud
    updateUser(input: updateuserExist): messageCrud
    deletedUser(id: ID!): String
  }
  #Base model User
  type User {
    id: ID
    firstname: String!
    lastname: String!
    email: String!
    phone: String
    website: String
    password: String!
    photo: String
    rol: Rol
    createdAt: String
    updatedAt: String
  }
  #fields necesary for create user
  input createNewUser {
    firstname: String
    lastname: String
    password: String!
    email: String!
    rol: ID!
  }

  #fields for update one user
  input updateuserExist {
    id: ID!
    firstname: String
    lastname: String
    phone: String
    website: String
    rol: ID
  }
`;

export const UserResolvers = {
  Query: {
    allUsers: async (_, __, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      return await showListRealTime('user', 'rol', { virtual: true });
    },

    getUserbyId: async (_: any, { id }) => {
      return await isExistById(id, 'user', '', { password: 0 });
    }
  },
  Mutation: {
    createUser: async (_: any, { input }, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      const { firstname, lastname, email, password, rol } = input;

      const userExist = await UserModel.findOne({ email: email });
      const rolExist = await isExistById(rol, 'rol');

      if (userExist) {
        throw handlerHttpError('try another email', typesErrors.ALREADY_EXIST);
      }

      if (rolExist) {
        const newuser = await createNewDocument(
          {
            firstname,
            lastname,
            password: await UserModel.encryptPassword(password),
            email,
            rol
          },
          'user'
        );
        result = await newuser.save();
      }

      if (result) {
        return {
          message: 'User Created!',
          success: true
        };
      }
      return null;
    },

    updateUser: async (_: any, args: any, { user }) => {
      if (!user) {
        throw handlerHttpError(
          'User dont register!',
          typesErrors.UNAUTHENTIFATED
        );
      }
      const { id, firstname, lastname, phone, website } = args.input;

      result = await updateOneElement(
        { _id: id },
        {
          firstname,
          lastname,
          phone,
          website
        },
        'user'
      );

      return {
        succes: true,
        message: 'User updated!'
      };
    },
    //eliminar los blogs relacionados
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
