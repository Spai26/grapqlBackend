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
