import { gql } from 'apollo-server-express';

import { showlist, validateExistenceData } from '@helpers/generalConsult';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import { updateOneElement } from '@helpers/RolesandPermisions.helper';

export const PermissionTypeDefs = gql`
  extend type Query {
    permision: [Permision]
  }

  extend type Mutation {
    createNewPermission(input: createNewPermission): messageCrud
    updateOnePermission(input: updateField!): messageCrud
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
    createNewPermission: async (_: any, args: any) => {},
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
    }
  }
};
