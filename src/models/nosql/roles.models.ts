import { Schema, model } from 'mongoose';
import { IRolDocument } from '@interfaces/rol.interface';

const RolSchema = new Schema<IRolDocument>(
  {
    name: { type: String, unique: true },
    description: { type: String },
    permissions: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

export const RolModel = model<IRolDocument>('Role', RolSchema);
