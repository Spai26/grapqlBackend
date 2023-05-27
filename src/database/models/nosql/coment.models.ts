import { Schema, model } from "mongoose";

const ComentSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    /* subtitle: { type: String, required: true }, */
    description: { type: String, required: true },
    /* short_description: { type: String, require: true }, */
    /* slug: { type: String, slug: "title" }, */
    /* count_view: { type: Number, default: 0 }, */
    image: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Coment", ComentSchema);
