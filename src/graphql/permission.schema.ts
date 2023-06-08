import { gql } from 'apollo-server-express';

import {
  createNewDocument,
  showlist,
  validateExistenceData
} from '@helpers/generalConsult';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import { updateOneElement } from '@helpers/RolesandPermisions.helper';
import { RolModel } from '@models/nosql/roles.models';
import { PermisionModel } from '@models/nosql/permission.models';
import mongoose, { ObjectId } from 'mongoose';
export const PermissionTypeDefs = gql`
  extend type Query {
    permision: [Permision]
  }

  extend type Mutation {
    createNewPermission(input: createNewPermission): messageCrud
    updateOnePermission(input: updateField!): messageCrud
    deletePermissionWithRelation(id: [ID!]!): messageCrud
  }

  type Permision {
    id: ID
    name: String
    description: String
  }

  input createNewPermission {
    name: String!
    description: String
  }

  #ID requerido para validacion
  input updateField {
    id: ID!
    name: String
    description: String
  }
`;

export const PermissionResolvers = {
  Query: {
    permision: async () => await showlist('permission')
  },
  Mutation: {
    createNewPermission: async (_: any, args: any) => {
      //verificar permisos validos (pendiente!)
      const { name } = args.input;
      const isExist = await PermisionModel.findOne({ name });

      if (isExist) {
        throw handlerHttpError(
          'This field name already exits',
          typesErrors.ALREADY_EXIST
        );
      }

      const newvalue = await createNewDocument(args.input, 'rol');

      const result = await newvalue.save();

      if (result) {
        return {
          succes: true,
          message: 'fields updated!'
        };
      }

      return null;
    },
    updateOnePermission: async (_: any, args: any) => {
      let result = undefined;
      const { id } = args.input;
      const isExist = await validateExistenceData(id, 'permission');

      if (!isExist) {
        throw handlerHttpError('invalid permission', typesErrors.BAD_REQUEST);
      }

      result = await updateOneElement(
        isExist._id,
        args.input,
        'permissionupdate'
      );

      if (result) {
        return {
          succes: true,
          message: 'fields updated!'
        };
      }

      return null;
    },
    deletePermissionWithRelation: async (_: any, args: any) => {
      let updatePermissionDeleted;
      const deletePromiseArray = args.id.map(async (data) => {
        return await PermisionModel.findByIdAndDelete({ _id: data });
      });

      const result = await Promise.all(deletePromiseArray);

      if (result.every((value) => value === null)) {
        throw handlerHttpError('The fields dont exist', typesErrors.NOT_FOUND);
      }

      if (result) {
        updatePermissionDeleted = await RolModel.updateMany(
          {
            permissions: { $in: args.id } //coincidencias
          },
          { $pull: { permissions: { $in: args.id } } } //elimina coincidencia
        );
      }

      if (result || updatePermissionDeleted) {
        return {
          message: 'fields deleted and relations!',
          succes: true
        };
      }

      return null;
    }
  }
};
