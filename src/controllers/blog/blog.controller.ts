import { getModelByName } from '@helpers/querys/generalConsult';
import { IBlog } from '@interfaces/blog.interface';
import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';

let list: IBlog[];

/** limit pagination for search */
let pageSize: number = 4;
let skipCount: number = (pageSize - 1) * pageSize;
const Model = getModelByName('blog');

/**
 * * function is to search for blogs by title using a regular expression and return a list of blogs that match the search criteria.
 * @param search
 * @returns IBlog[]
 */
export const searchBlogsByTitle = async (search: string) => {
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
export const getBlogResulbyId = async (id: string) => {
  let blog: IBlog | null;
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

export const getAllBlogsWithRelations = async (): Promise<IBlog[]> => {
  try {
    //'blog', 'author', 'front_image'
    list = await Model.find({})
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
