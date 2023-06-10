import { createNewDocument, isExistById } from '@helpers/generalConsult';
import { uploadImage } from '@helpers/generateImageUrl';
import { validExtensionImage } from '@helpers/validateExtension';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import gql from 'graphql-tag';
let result;
export const BlogPrivateTypeDefs = gql`
  extend type Query {
    #para evitar errores
    hello: String
  }
  extend type Mutation {
    attachNewBlog(input: addNewBlog): messageCrud
  }

  input addNewBlog {
    title: String!
    body_content: String
    front_image: image!
    author: ID!
  }

  input image {
    url: String
    model_type: String
  }
`;

export const BlogPrivateResolvers = {
  Mutation: {
    attachNewBlog: async (_: any, { input }, { user }) => {
      /**
       * modo rootAdmin
       */
      const { title, body_content, front_image, author } = input;
      const { model_type } = front_image;
      const exist = await isExistById(author, 'user');
      const imageExtension = validExtensionImage(front_image.url);

      if (!exist) {
        throw handlerHttpError('User no valid', typesErrors.BAD_USER_INPUT);
      }

      if (!imageExtension) {
        throw handlerHttpError('Image no valid!', typesErrors.BAD_REQUEST);
      }

      const urlimage = await uploadImage(front_image.url);
      const image = await createNewDocument(
        { url: urlimage, model_type, model_id: null },
        'image'
      );

      if (exist && imageExtension) {
        const newblog = await createNewDocument(
          {
            title,
            body_content,
            front_image: image._id,
            author: exist._id
          },
          'blog'
        );

        image.model_id = newblog._id;
        await image.save();
        await newblog.save();

        return {
          success: true,
          message: 'Blog agregate'
        };
      }

      /* return null; */
    }
  }
};
