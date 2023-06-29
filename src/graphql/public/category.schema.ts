import { createNewDocument, showlist } from '@helpers/querys/generalConsult';
import gql from 'graphql-tag';

export const CategoryTypeDefs = gql`
  extend type Query {
    #para evitar errores
    getAllCategory: [Category]
  }

  extend type Mutation {
    attachNewCategory(input: generalValues): messageCrud
  }

  type Category {
    id: ID
    name: String!
    slug: String
  }
`;

export const CategoryResolvers = {
  Query: {
    getAllCategory: async () => {
      return await showlist('category');
    }
  },
  Mutation: {
    attachNewCategory: async (_, { input }, { user }) => {
      let result = await createNewDocument(input, 'category');
      result = await result.save();
      return {
        success: true,
        message: 'Category add!'
      };
    }
  }
};
