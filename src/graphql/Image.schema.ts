import gql from 'graphql-tag';

export const ImageTypeDefs = gql`
  type Image {
    url: String
    model_type: String
    model_id: ID!
  }

  input image {
    url: String!
    model_type: String!
    #model_id autogenerate
  }
`;
