import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    username: { type: String },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true },
    website: { type: String },
    password: { type: String, require: true },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, recivePassword) => {
  return await bcrypt.compare(password, recivePassword);
};

export default model("User", UserSchema);
