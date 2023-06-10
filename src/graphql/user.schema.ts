import { gql } from 'graphql-tag';

import { UserModel } from '@models/nosql/user.models';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import {
  createNewDocument,
  existFields,
  isExistById,
  showListRealTime,
  updateOneElement
} from '@helpers/generalConsult';

let result;
/**
 * @important: add ! if is required
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
    allUsers: async () => {
      return await showListRealTime('user', 'rol', { virtual: true });
    },

    getUserbyId: async (_: any, { id }) => {
      return await isExistById(id, 'user', '', { password: 0 });
    }
  },
  Mutation: {
    createUser: async (_: any, { input }) => {
      const { firstname, lastname, email, password, rol } = input;

      const userExist = await existFields('user', email);
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
          succes: true,
          message: 'User Created!'
        };
      }
      return null;
    },

    updateUser: async (_: any, args: any) => {
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

    deletedUser: async (_: any, { _id }) => {
      const cleanUser = await UserModel.findByIdAndDelete(_id);

      return 'User Deleted';
    }
  }
};
