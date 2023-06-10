import { handlerHttpError, typesErrors } from '@middlewares/handlerErrors';
import { PermisionModel } from '@models/nosql/permission.models';

export const createPermissionBase = async () => {
  try {
    const count = await PermisionModel.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new PermisionModel({ name: 'created' }).save(),
      new PermisionModel({ name: 'read' }).save(),
      new PermisionModel({ name: 'insert' }).save(),
      new PermisionModel({ name: 'update' }).save(),
      new PermisionModel({ name: 'delete' }).save(),
      new PermisionModel({ name: 'deleted users' }).save()
    ]);
    console.log(values);
  } catch (error) {
    throw handlerHttpError('fields dont agregated.!', typesErrors.BAD_REQUEST);
  }
};
