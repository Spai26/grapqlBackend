import { BlogModel } from '@models/nosql/blog.models';
import { getModelByName, isExistById } from './generalConsult';

let Model;
//{ path: childOne }
//{ path: childtwo, select: 'url' }

/**
 ** This function shows me the real data found in the database
 * * with relation two level
 * @param parent
 * @param childOne
 * @param childtwo
 * @returns
 */
export const showListWithTwoRelation = async (
  parent: string,
  childOne: string, //user
  childtwo: string
) => {
  Model = getModelByName(parent);
  return (
    (await Model.find({})
      .populate({ path: childOne, select: 'id email firstname lastname' })
      .populate(childtwo)) || null
  );
};

export const counterViews = async (id) => {
  let result;
  const blog = await BlogModel.findById(id).populate({
    path: 'author',
    select: 'id email firstname lastname'
  });

  if (blog) {
    blog.count_view = (blog.count_view as number) + 1;
    result = await blog.save();
  }
  return result;
};
