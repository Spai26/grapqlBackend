import { createNewDocument, showlist } from '@helpers/querys/generalConsult';
import gql from 'graphql-tag';

export const TagTypeDefs = gql`
  extend type Query {
    #para evitar errores
    getAllTags: [Tag]
  }
  extend type Mutation {
    attachNewTag(input: generalValues): messageCrud
  }

  type Tag {
    id: ID
    name: String
    slug: String
  }
`;

export const TagResolvers = {
  Query: {
    getAllTags: async () => {
      return await showlist('tag');
    }
  },
  Mutation: {
    attachNewTag: async (_, { input }, { user }) => {
      let result = await createNewDocument(input, 'tag');
      result = await result.save();
      return {
        success: true,
        message: 'Tag add!'
      };
    }
  }
};
