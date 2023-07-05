import gql from 'graphql-tag';

export const ImageTypeDefs = gql`
  extend type Query {
    getImages: [Image]
  }

  extend type Mutation {
    uploadImage(file: Upload!): Response
  }

  type Image {
    url: String
    model_type: imageEnumTypes
    model_id: ID! #reference to models father
  }

  #reference IImage
  enum imageEnumTypes {
    GALLERY
    IMAGE
    LOGO
  }

  #model_id autogenerate when created
  input ImageInput {
    url: String!
    model_type: imageEnumTypes!
  }

  scalar Upload
`;
