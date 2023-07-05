import { BlogModel } from '@models/nosql';
import { CategoryModel } from '@models/nosql/category.models';
import { TagModel } from '@models/nosql/tag.models';
import gql from 'graphql-tag';
let result = null;
export const GeneralTypeDefs = gql`
  #search global
  union SearchResult = SearchCategory | SearchTag | SearchBlog
  type Query {
    search(contains: String): [SearchResult!]
  }

  #message global
  type Response {
    success: Boolean
    message: String
  }

  #input for tag/category/permission/rol
  input NameOrDescInput {
    name: String!
    description: String
  }

  input NameAndDescPatchInput {
    id: ID!
    name: String!
    description: String
  }
`;

export const GeneralResolvers = {
  SearchResult: {
    __resolveType(obj, context, info) {
      if (obj.hasOwnProperty('nameCat')) {
        return 'SearchCategory';
      } else if (obj.hasOwnProperty('nameTag')) {
        return 'SearchTag';
      } else if (obj.hasOwnProperty('title')) {
        return 'SearchBlog';
      }

      return null;
    }
  },
  Query: {
    search: async (_, { contains }) => {
      const category = await CategoryModel.find({
        name: { $regex: contains, $options: 'i' }
      });
      const tag = await TagModel.find({
        name: { $regex: contains, $options: 'i' }
      });

      const blog = await BlogModel.find({
        title: { $regex: contains, $options: 'i' }
      });

      result = [
        ...category.map((categoryItem) => ({
          __typename: 'SearchCategory',
          nameCat: categoryItem.name
        })),
        ...tag.map((tagItem) => ({
          __typename: 'SearchTag',
          nameTag: tagItem.name
        })),
        ...blog.map((blogItem) => ({
          __typename: 'SearchBlog',
          title: blogItem
        }))
      ];

      return result;
    }
  }
};
