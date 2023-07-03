import { showlist } from '@helpers/querys/generalConsult';
import gql from 'graphql-tag';

export const PTagTypeDefs = gql`
  extend type Query {
    getAllTags: [Tag]
  }
`;

export const PTagResolvers = {
  Query: {
    getAllTags: async () => {
      return await showlist('tag');
    }
  }
};
