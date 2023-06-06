import mongoose, { Schema } from 'mongoose';

const PermissionSchema = new Schema(
  {
    name: { type: String, unique: true }
  },
  {
    timestamps: false,
    versionKey: false
  }
);
