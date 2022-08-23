import { Document, model, Schema, Types } from 'mongoose';
import { checkDuplicateName } from '../helpers';
import Product from './product.model';

export interface IProductCategory extends Document {
  name: string;
  products: Types.ObjectId[];
}

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    name: { type: String, required: true, unique: true, minlength: 4, maxlength: 50 },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

ProductCategorySchema.pre('deleteOne', { document: true }, async function (next) {
  const foundProducts = await Product.find({ category: this._id }).exec();
  if (foundProducts.length > 0) {
    for (const product of foundProducts) {
      product.category = null;
      await product.save();
    }
    return next();
  }
  return next();
});

ProductCategorySchema.post('save', function (error: any, doc: any, next: any) {
  checkDuplicateName(error, next, 'tên danh mục');
});

ProductCategorySchema.post('updateOne', function (error: any, doc: any, next: any) {
  checkDuplicateName(error, next, 'tên danh mục');
});

const ProductCategory = model<IProductCategory>('Product_Category', ProductCategorySchema);

export default ProductCategory;
