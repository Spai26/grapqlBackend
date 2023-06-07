import { gql } from 'apollo-server-express';

import { showlist } from '@helpers/generalConsult';
export const PermissionTypeDefs = gql`
  extend type Query {
    permision: [Permision]
  }

  extend type Mutation {
    updateCreatedPermission(id: ID!, input: updateField): messageCrud
  }

  type Permision {
    id: ID
    name: String
    description: String
  }

  input updateField {
    name: String
    description: String
  }
`;

export const PermissionResolvers = {
  Query: {
    permision: async () => await showlist('permission')
  },
  Mutation: {
    updateCreatedPermission: async (_: any, args: any) => {}
  }
};
