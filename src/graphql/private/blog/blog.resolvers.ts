import { deleteController } from '@controllers/blog/auth/userAuthBlog.controller';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import {
  PERMISSIONS,
  ROL,
  ResponseResult
} from '@interfaces/types/type.custom';
import {
  createNewDocument,
  getModelByName
} from '@helpers/querys/generalConsult';
import { validExtensionImage } from '@helpers/validateExtension';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { uploadImage } from '@helpers/generateImageUrl';

let result = null;

export const BlogResolvers = {
  Query: {
    getAllOnwerBlogs: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, __, context) => {
          const { id } = context.user;
          //falta considerar origin or source
          return 'here' /* getAllBlogsWithRelations({ author: id }) */;
        })
      )
    ),
    getOneBlogbyIdOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, { id }, context) => {
          return ' here' /* getBlogOnwer(id) */;
        })
      )
    )
  },
  Mutation: {
    newBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (_: any, { input }, context): Promise<ResponseResult> => {
            const { alias } = context.user;
            const { title, body_content, front_image, status } = input;
            const { url, model_type } = front_image;

            const imageExtension = validExtensionImage(url);
            if (!imageExtension) {
              throw handlerHttpError(
                'Image no valid!',
                typesErrors.BAD_REQUEST
              );
            }

            const urlimage = await uploadImage(url);
            const image = await createNewDocument(
              { url: urlimage, model_type, model_id: null },
              'image'
            );
            const model = getModelByName('blog');
            const newvalue = new model({
              title,
              body_content,
              front_image: image._id,
              status,
              author: ROL.ROOT,
              origin: 'root'
            });

            await image.save();
            await newvalue.save();

            return {
              message: 'create',
              success: true
            };
          }
        )
      )
    ),
    updateMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { id, input }, context) => {
            return 'here'; /* await updateBlogController(id, input); */
          }
        )
      )
    ),
    updateStatusBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, { id, status }, context) => {
            return 'here'; /* await updateStatusController(id, status); */
          }
        )
      )
    ),

    deleteMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (_: any, { id }, context) => {
          return await deleteController(id);
        })
      )
    )
  }
};
