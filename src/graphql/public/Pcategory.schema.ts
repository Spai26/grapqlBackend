import { showCategory } from '@controllers/public/Pcategory.controller';
import gql from 'graphql-tag';

export const PCategoryTypeDefs = gql`
  extend type Query {
    _: String
    getAllCategory: [Category]
  }
`;

export const PCategoryResolvers = {
  Query: {
    getAllCategory: () => {
      return showCategory();
    }
  }
};
