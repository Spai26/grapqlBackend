import { gql } from 'graphql-tag';

import { UserModel } from '@models/nosql/user.models';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';

import { existUser } from 'src/libs/helpers/user.helper';

/**
 * @important: add ! if is required
 */
export const UsertypeDefs = gql`
  #Query consult list
  extend type Query {
    hello: String
    allUsers: [User]
    getUserbyId(_id: ID!): User
  }
  #Mutation list
  extend type Mutation {
    createUser(input: createNewUser): User
    updateUser(input: updateuserExist): messageCrud
    deletedUser(_id: ID!): String
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
    password: String
    email: String
    rol: ID
  }

  #fields for update one user
  input updateuserExist {
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
      const usuarios = await UserModel.find({}).populate('rol', 'name'); // Cargar la referencia de roles

      return usuarios;
    },

    getUserbyId: async (_: any, { _id }) =>
      UserModel.findById(_id, {
        password: 0
      })
  },
  Mutation: {
    createUser: async (_: any, { input }) => {
      const { firstname, lastname, email, password, rol } = input;

      const emailExist = await existUser(email);

      //convert boolean if null
      if (!emailExist) {
        throw handlerHttpError('try another email', typesErrors.ALREADY_EXIST);
      }

      /* verifica el rol entrante mirar a forma de generarlo desde el modelo similar a laravel o directamente por el momento */
      const newuser = new UserModel({
        firstname,
        lastname,
        password: await UserModel.encryptPassword(password),
        email,
        rol
      });

      const useradd = await newuser.save();

      return {
        ...useradd,
        succes: true,
        message: 'User Created!'
      };
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
