import { Schema, model } from 'mongoose';
import { IRol } from '@interfaces/rol.interface';
const RolSchema = new Schema<IRol>(
  {
    name: { type: String, unique: true }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

export const RolModel = model<IRol>('Role', RolSchema);
export { IRol };
