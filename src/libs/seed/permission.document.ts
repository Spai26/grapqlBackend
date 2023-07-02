import { IPermisionDocument } from '@interfaces/permission.interface';
import { logger } from '@libs/winstom.lib';
import { PermisionModel } from '@models/nosql/permission.models';

export const createPermissionBase = async (): Promise<IPermisionDocument[]> => {
  try {
    const count = await PermisionModel.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new PermisionModel({ namePermission: 'created' }).save(),
      new PermisionModel({ namePermission: 'read' }).save(),
      new PermisionModel({ namePermission: 'updated' }).save(),
      new PermisionModel({ namePermission: 'deleted' }).save()
    ]);
    logger.info(values);
  } catch (error) {
    logger.info('fields dont agregated.!');
  }
};
