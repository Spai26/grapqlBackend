import mongoose, { Model, Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

interface IBlog {
  title: String;
  body_content: string;
  front_image: String;
  slug_title: String;
  count_view: Number;
  onwer: Schema.Types.ObjectId;
}

interface MBlog extends Model<IBlog> {
  incrementViewCount(): Number;
  updateSlug(id: String): String;
}

const BlogSchema = new Schema<IBlog, MBlog>(
  {
    title: { type: String, require: true, unique: true },
    body_content: { type: String, require: true },
    front_image: { type: String, require: true },
    slug_title: { type: String, slug: 'title' },
    count_view: { type: Number, default: 0 },
    onwer: { type: Schema.Types.ObjectId, ref: 'User' }
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

export const BlogModel = model<IBlog, MBlog>('Blog', BlogSchema);
