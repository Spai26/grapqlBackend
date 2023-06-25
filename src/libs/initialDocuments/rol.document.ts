import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { RolModel } from '@models/nosql/roles.models';

export const createRoles = async () => {
  try {
    const count = await RolModel.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new RolModel({ name: 'content creator' }).save(),
      new RolModel({ name: 'translator' }).save(),
      new RolModel({ name: 'shop manager' }).save(),
      new RolModel({ name: 'customer' }).save(),
      new RolModel({ name: 'employer' }).save(),
      new RolModel({ name: 'subscriber' }).save(),
      new RolModel({ name: 'contributor' }).save(),
      new RolModel({ name: 'author' }).save(),
      new RolModel({ name: 'editor' }).save(),
      new RolModel({ name: 'administrator' }).save(),
      new RolModel({ name: 'root' }).save()
    ]);
    console.log(values);
  } catch (error) {
    throw handlerHttpError('fields dont agregated.!', typesErrors.BAD_REQUEST);
  }
};
