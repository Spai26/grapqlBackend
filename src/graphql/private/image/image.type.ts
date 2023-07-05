import gql from 'graphql-tag';

export const ImageTypeDefs = gql`
  extend type Query {
    show: [Image]
  }

  extend type Mutation {
    updateImage(input: ImageInput): Response
  }

  type Image {
    url: String
    model_type: imageEnumTypes
    model_id: ID! #reference to models father
    source: String
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
    source: String
  }
`;
