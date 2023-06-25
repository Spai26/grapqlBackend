import { FileUpload } from 'graphql-upload-ts';
import gql from 'graphql-tag';
import { showlist } from '@helpers/querys/generalConsult';

export const ImageTypeDefs = gql`
  scalar Upload

  extend type Query {
    _: String
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

export const ImageResolvers = {
  Query: {
    getImages: async () => {
      return await showlist('image');
    },
    getTesting: async () => {
      return await showlist('test');
    }
  },
  Mutation: {
    uploadImage: async (parent, { file }: { file: Promise<FileUpload> }) => {
      // Verifica si se proporcionó un archivo
      file.then((uploadedFile) => {
        // Aquí puedes manipular el archivo subido, por ejemplo, guardarlo en Cloudinary
        console.log(uploadedFile); // Aquí puedes utilizar la librería de Cloudinary para subir el archivo
        return { success: true, message: 'Archivo subido exitosamente' };
      });
      return {
        success: true,
        message: 'here'
      };
    }
  }
};
