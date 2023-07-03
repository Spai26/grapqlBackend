import { showlist } from '@helpers/querys/generalConsult';

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
    uploadImage: async (parent, { file }) => {
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
