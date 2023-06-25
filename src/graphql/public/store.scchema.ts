import { validateAndCreateImage } from '@helpers/querys/Image.query';
import { createNewDocument } from '@helpers/querys/generalConsult';
import { StoreModel } from '@models/nosql/store.models';
import gql from 'graphql-tag';

export const StorePublicTypeDefs = gql`
  extend type Query {
    #para evitar errores
    getAllStore: [Store]
    getDetailStore(id: ID!): Store
    getOnwerAllStore: [Store]
  }

  extend type Mutation {
    attachNewStore(input: addnewstore): messageCrud
    updateMyStore(id: ID!, input: onwerUpdateStore): messageCrud
    deleteMyStore(id: ID!): messageCrud
  }

  type Store {
    id: ID
    title: String!
    sub_title: String
    slug: String
    description: String!
    main_image: Image!
    logo: Image
    phone: String
    address: String!
    positionX: String!
    positionY: String!
    region: String
    country: String
    url_website: String
    url_video: String
    email: String
    socials: [Social]
    times_tables: [Times]
    onwer: User
    tags: [Tag]
    galleries_image: [Image]
    categories: [Category]
  }

  type Social {
    name_social: String
    url: String
  }

  type Times {
    week_name: String
    open_time: String
    close_time: String
    open: Boolean
  }

  input addnewstore {
    title: String!
    sub_title: String!
    description: String!
    main_image: ImageInput!
    logo: ImageInput
    phone: String
    address: String!
    positionX: String!
    positionY: String!
    region: String
    country: String
    url_video: String
    url_website: String
    email: String
    socials: [SocialInput]
    times_tables: [TimesInput]
    galleries_image: [ImageInput]
    onwer: ID
    categories: [ID!]
    tags: [ID!]
  }

  input TimesInput {
    week_name: String
    open_time: String
    close_time: String
    open: Boolean
  }

  input SocialInput {
    name_social: String
    url: String
  }

  input onwerUpdateStore {
    id: ID!
  }
`;

export const StorePublicResolvers = {
  Query: {
    getAllStore: async () => {
      return StoreModel.find({})
        .populate('logo')
        .populate('onwer')
        .populate('tags')
        .populate('categories')
        .populate('main_image');
    },
    getDetailStore: async () => {
      return 'hello';
    },
    getOnwerAllStore: async () => {
      return 'hello';
    }
  },
  Mutation: {
    attachNewStore: async (_, { input }, { user }) => {
      console.log({ input });
      let result;
      const newstore = await createNewDocument(input, 'store');
      const frontPageImage = await validateAndCreateImage(input.main_image);

      newstore.onwer = user.id;
      newstore.main_image = frontPageImage._id;

      frontPageImage.model_id = newstore._id;
      await frontPageImage.save();
      result = await newstore.save();
      console.log(result);

      return 'hello';
    },
    updateMyStore: async () => {
      return 'hello';
    },
    deleteMyStore: async () => {
      return 'hello';
    }
  }
};
