import { Document, model, Schema } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  imageUrl: string;
  productInfo: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true, minlength: 4, maxlength: 50 },
    description: { type: String },
    imageUrl: { type: String, required: true },
    productInfo: { type: String },
  },
  { timestamps: true }
);

const ProductCategory = model<IProduct>('Product', ProductSchema);

export default ProductCategory;
