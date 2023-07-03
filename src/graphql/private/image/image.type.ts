import gql from 'graphql-tag';

export const ImageTypeDefs = gql`
  scalar Upload

  extend type Query {
    getImages: [Image]
    getTesting: [Testing]
  }

  extend type Mutation {
    uploadImage(file: Upload!): messageCrud
  }

  type Image {
    url: String
    model_type: imageTypes
    model_id: ID! #reference to models father
  }

  type Testing {
    image: Image
    gallery: [Image]
  }

  enum imageTypes {
    GALLERY
    IMAGE
    LOGO
  }

  input ImageInput {
    url: String!
    model_type: imageTypes!
    #model_id autogenerate when created
  }

  scalar Upload
`;
