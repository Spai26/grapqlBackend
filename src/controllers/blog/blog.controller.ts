import {
  findOptions,
  getModelByName,
  isExistById
} from '@helpers/querys/generalConsult';
import { IBlog } from '@interfaces/blog.interface';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import { searchOptions } from '@utils/typesCustom';
import { rootNewBlogController } from './auth/rootBlogController';
import { createBlogController } from './auth/userAuthBlog.controller';

let list: IBlog[];
let blog: IBlog | null;
/** limit pagination for search */
let pageSize: number = 4;
let skipCount: number = (pageSize - 1) * pageSize;
const Model = getModelByName('blog');

/**
 * * function for call of all the list of blogs
 * @returns IBlog[]
 */
export const getAllBlogsWithRelations = async (
  options?: findOptions
): Promise<IBlog[]> => {
  try {
    //'blog', 'author', 'front_image'
    list = await Model.find(options)
      .populate({ path: 'author', select: 'id email firstname lastname' })
      .populate('front_image');

    if (list.length === 0) {
      return [];
    }

    return list;
  } catch (error) {
    throw handlerHttpError(
      `Error fn: getAllBlogs: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

/**
 * * function is to search for blogs by title using a regular expression and return a list of blogs that match the search criteria.
 * @param search
 * @returns IBlog[]
 */
export const searchBlogsByTitle = async (search: string): Promise<IBlog[]> => {
  try {
    list = await Model.find({ title: { $regex: search, $options: 'i' } })
      .populate({
        path: 'author',
        select: 'id email firstname lastname'
      })
      .populate('front_image', 'url')
      .skip(skipCount)
      .limit(pageSize);

    return list;
  } catch (error) {
    throw handlerHttpError(
      `Error fn: searchBlogsByTitle: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

/**
 * * the function is to retrieve a blog post from the  database by its ID, increment its view count, and return the blog post with relations.
 * @param id
 * @returns Blog
 */
export const getBlogResulbyId = async (id: string): Promise<IBlog> => {
  try {
    blog = await Model.findOneAndUpdate(
      { _id: id },
      { $inc: { count_view: 1 } },
      { new: true }
    )
      .populate({
        path: 'author',
        select: 'id email firstname lastname'
      })
      .populate('front_image', 'url')
      .lean();

    return blog;
  } catch (error) {
    throw handlerHttpError(
      `Error fn: getBlogResulbyId: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

/**
 ** function getBlogOnwer is to retrieve a blog post from the database by its ID and populate it with the author's information and front image URL.
 * @param id
 * @returns  IBlog
 */
export const getBlogOnwer = async (id: string): Promise<IBlog> => {
  try {
    blog = await Model.findById(id)
      .populate({
        path: 'author',
        select: 'id email firstname lastname'
      })
      .populate('front_image', 'url');

    return blog;
  } catch (error) {
    throw handlerHttpError(
      `Error fn: getBlogOnwer: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

/**
 *
 * @param user
 * @param input
 * @returns new IBlog
 */
export const branchBlogController = async (
  user,
  input: searchOptions<string>
) => {
  try {
    const checkrol = await isExistById(user.rol, 'rol');

    if (checkrol.name === 'superAdmin') {
      return await rootNewBlogController(input);
    }
    /* CHECK PERMISSION = anypermission.include("...")
    let lispermission = {
      update : fn(editar)
      create: fn (crear)
      delete: fn(delete)
      
    } */
    return await createBlogController(user, input);
  } catch (error) {
    throw handlerHttpError(
      `Error fn: branchBlog ${error}`,
      typesErrors.ROL_NOT_VALID
    );
  }
};
