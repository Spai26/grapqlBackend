import { Schema, model } from 'mongoose';
import { IRolDocument } from '@interfaces/rol.interface';

const RolSchema = new Schema<IRolDocument>(
  {
    name: { type: String, unique: true }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

export const RolModel = model<IRolDocument>('Role', RolSchema);
