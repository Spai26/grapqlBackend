import mongoose, { Document, Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

const BlogSchema = new Schema(
  {
    title: { type: String, require: true },
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

BlogSchema.statics.updateSlug = async function (id) {
  const blogfound = await this.findById(id);

  if (!blogfound) {
    return;
  }

  // Actualizar el slug basado en el título
  blogfound.slug = blogfound.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  // Guardar los cambios en la base de datos
  await blogfound.save();
  return blogfound;
};

export default model('Blog', BlogSchema);
