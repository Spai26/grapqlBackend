import { IRolDocument } from '@interfaces/rol.interface';
import { RolModel } from '@models/nosql/roles.models';

export const createRoles = async (): Promise<IRolDocument> => {
  try {
    const count = await RolModel.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      /*  new RolModel({ name: 'content creator' }).save(),
      new RolModel({ name: 'translator' }).save(),
      new RolModel({ name: 'shop manager' }).save(),
      new RolModel({ name: 'customer' }).save(),
      new RolModel({ name: 'employer' }).save(), */
      new RolModel({ name: 'usuario' }).save(),
      new RolModel({ name: 'vendor' }).save(),
      new RolModel({ name: 'editor' }).save(),
      new RolModel({ name: 'brand' }).save(),
      new RolModel({ name: 'administrator' }).save(),
      new RolModel({ name: process.env.ROOTROL }).save()
    ]);
    console.log(values);
  } catch (error) {
    console.log('fields dont agregated.!');
  }
};
