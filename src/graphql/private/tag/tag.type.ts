import gql from 'graphql-tag';

export const TagTypeDefs = gql`
  extend type Query {
    _: String
    #para evitar errores
    getAllTags: [Tag]
  }
  extend type Mutation {
    newTag(input: NameOrDescInput): Response
    updateTag(input: NameAndDescPatchInput): Response
    deleteTag(id: ID!): Response
  }

  type SearchTag {
    name: String!
  }

  type Tag {
    id: ID
    name: String
    slug: String
  }
`;
