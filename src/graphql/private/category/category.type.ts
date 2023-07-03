import gql from 'graphql-tag';

export const CategoryTypeDefs = gql`
  extend type Query {
    _: String
  }

  extend type Mutation {
    _: String
    #nameorDescInput ref: schema
    newCategory(input: NameOrDescInput): Response
    updatedCategory(input: NameAndDescPatchInput): Response
    deletedCategory(id: ID!): Response
  }

  #for search
  type SeacrhCategory {
    name: String!
  }

  type Category {
    id: ID
    name: String!
    slug: String
  }
`;
