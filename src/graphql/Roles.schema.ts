import { gql } from 'apollo-server-express';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';

import { RolModel } from '@models/nosql/roles.models';
import { assignPermissions, showlist } from '@helpers/generalConsult';
import {
  checkArrayElement,
  existRole,
  updateElement,
  updateOneElement
} from '@helpers/RolesandPermisions.helper';

export const RolesTypeDefs = gql`
  extend type Query {
    roles: [Rol]
  }

  extend type Mutation {
    updateRolBaseOnPermission(id: ID!, input: updateFields): messageCrud
    updateArrayRolesWithPermissions(input: [arrayUpdateFields!]!): messageCrud
  }

  type Rol {
    id: ID
    name: String!
    description: String
    permissions: [Permision]
  }

  # permission ID representa el type permission
  # solo aceptara ID existentes
  input updateFields {
    name: String
    description: String
    permissions: [ID]
  }

  input arrayUpdateFields {
    id: ID!
    name: String
    description: String
    permissions: [ID]
  }
`;

export const RolResolvers = {
  Query: {
    roles: async () => await showlist('rol')
  },
  Mutation: {
    updateRolBaseOnPermission: async (_: any, args: any) => {
      const { permissions } = args.input;
      const validRol = await existRole(args.id);
      let result = undefined;
      //return null or true !convert to boolean
      if (!validRol) {
        throw handlerHttpError('invalid role', typesErrors.BAD_REQUEST);
      }

      // insert permissions
      const validArray = await checkArrayElement(permissions);

      if (validArray) {
        const valid_Array_Permission = await assignPermissions(permissions);

        if (valid_Array_Permission) {
          result = await updateOneElement(args.id, args.input);
        }
      }

      result = await updateOneElement(args.id, args.input);

      if (result) {
        return {
          succes: true,
          message: 'fields updated!'
        };
      }
      return null;
    },
    updateArrayRolesWithPermissions: async (_: any, args: any) => {
      const updatePromiseArray = args.input.map(async (fieldForUpdate) => {
        const { id } = fieldForUpdate;

        if (!(await existRole(id))) {
          throw handlerHttpError('invalid role', typesErrors.BAD_REQUEST);
        }

        await updateElement(fieldForUpdate);
      });

      const result = await Promise.all(updatePromiseArray);

      if (result) {
        return {
          message: 'fields updated!',
          succes: true
        };
      }
      return null;
    }
  }
};
