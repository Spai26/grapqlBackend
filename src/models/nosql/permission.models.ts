import { Schema, model } from 'mongoose';
import { IPermisionDocument } from '@interfaces/permission.interface';

const PermissionSchema = new Schema<IPermisionDocument>(
  {
    name: { type: String, unique: true },
    description: { type: String }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

export const PermisionModel = model<IPermisionDocument>(
  'Permission',
  PermissionSchema
);
