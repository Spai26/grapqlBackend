import { gql } from 'apollo-server-express';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';

import { isExistById, showlist } from '@helpers/generalConsult';
import { updateElement } from '@helpers/RolesandPermisions.helper';

export const RolesTypeDefs = gql`
  extend type Query {
    roles: [Rol]
  }

  extend type Mutation {
    updateArrayRolesWithPermissions(input: [arrayUpdateFields!]!): messageCrud
  }

  type Rol {
    id: ID
    name: String!
    description: String
    permissions: [Permision]
  }

  # solo aceptara ID existentes
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
    updateArrayRolesWithPermissions: async (_: any, args: any) => {
      const updatePromiseArray = args.input.map(async (fieldForUpdate) => {
        const { id } = fieldForUpdate;

        if (!(await isExistById(id, 'rol'))) {
          throw handlerHttpError('invalid role', typesErrors.BAD_REQUEST);
        }

        return await updateElement(fieldForUpdate);
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
