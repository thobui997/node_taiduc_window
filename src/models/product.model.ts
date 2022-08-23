import httpStatus from 'http-status';
import { Document, model, Schema, Types } from 'mongoose';
import { checkDuplicateName } from '../helpers';
import ProductCategory from '../models/category.model';
import { ApiError } from './../exceptions/api-error';

export interface IProduct extends Document {
  title: string;
  description: string;
  imageUrl: string;
  productInfo: string;
  category: Types.ObjectId | null;
  _previousCategoryId: Types.ObjectId | null;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true, minlength: 4, maxlength: 50 },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    productInfo: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      set: function (categoryId: Types.ObjectId) {
        const that = this as IProduct;
        that._previousCategoryId = that.category ? that.category : null;
        return categoryId;
      },
    },
  },
  { timestamps: true }
);

ProductSchema.pre('deleteOne', { document: true }, async function (next) {
  const foundCategory = await ProductCategory.findById(this.category).exec();
  if (foundCategory) {
    foundCategory.products = foundCategory.products.filter((product) => product._id.toString() !== this._id.toString());
    await foundCategory.save();
    return next();
  }
  return next();
});

ProductSchema.post('save', async function (error: any, doc: any, next: any) {
  checkDuplicateName(error, next, 'tên sản phẩm');
});

ProductSchema.post('save', async function (doc: any, next: any) {
  const previousCategoryId = this._previousCategoryId;
  if (previousCategoryId) {
    const foundPreviousCategory = await ProductCategory.findById(previousCategoryId).exec();
    if (foundPreviousCategory) {
      const products = foundPreviousCategory.products.filter(
        (product) => product._id.toString() !== this._id.toString()
      );
      foundPreviousCategory.products = products;
      await foundPreviousCategory.save();
    }
  }

  const foundCategory = await ProductCategory.findById(this.category).exec();
  if (!foundCategory) return next(new ApiError(httpStatus.BAD_REQUEST, 'danh mục không tồn tại'));
  if (!foundCategory.products.includes(this._id)) foundCategory.products.push(this._id);
  await foundCategory.save();
  return next();
});

const Product = model<IProduct>('Product', ProductSchema);

export default Product;
