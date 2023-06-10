import slug from 'mongoose-slug-generator';
import { IBlogDocument, IBlogModel } from '@interfaces/blog.interface';
import mongoose, { Schema, model } from 'mongoose';
mongoose.plugin(slug);

const BlogSchema = new Schema<IBlogDocument, IBlogModel>(
  {
    title: { type: String, require: true, unique: true },
    body_content: { type: String, require: true },
    front_image: { type: Schema.Types.ObjectId, ref: 'Image' },
    slug_title: { type: String, slug: 'title' },
    count_view: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

BlogSchema.methods.incrementViewCount = async function () {
  this.count_view += 1;
  await this.save();
};

BlogSchema.statics.updateSlug = async function (id: string) {
  const blogfound = await this.findById(id);

  if (!blogfound) {
    return;
  }

  // Actualizar el slug basado en el título
  blogfound.slug_title = blogfound.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  // Guardar los cambios en la base de datos
  await blogfound.save();
  return blogfound;
};

export const BlogModel = model<IBlogDocument, IBlogModel>('Blog', BlogSchema);
