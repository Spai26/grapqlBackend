import gql from 'graphql-tag';

export const PermissionTypeDefs = gql`
  extend type Query {
    getAllPermision: [Permision]
  }

  extend type Mutation {
    createNewPermission(input: createNewPermission): Response
    updateOnePermission(input: updateField!): Response
    deletePermissionWithRelation(id: [ID!]!): Response
  }

  type Permision {
    id: ID
    namePermission: String
    description: String
  }

  input createNewPermission {
    namePermission: String!
    description: String
  }

  #ID requerido para validacion
  input updateField {
    id: ID!
    namePermission: String
    description: String
  }
`;
