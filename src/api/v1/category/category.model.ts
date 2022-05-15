import { ApiError } from './../../../exceptions/apiError';
import { Document, model, ObjectId, Schema } from 'mongoose';
import httpStatus from 'http-status';

export interface IProductCategory extends Document {
  name: string;
  products: ObjectId[];
}

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    name: { type: String, required: true, unique: true, minlength: 4, maxlength: 50 },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

const checkDuplicateName = (error: any, next: any) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new ApiError(httpStatus.BAD_REQUEST, 'tên danh mục đã tồn tại'));
  } else {
    next();
  }
};

ProductCategorySchema.post('save', function (error: any, doc: any, next: any) {
  checkDuplicateName(error, next);
});

ProductCategorySchema.post('updateOne', function (error: any, doc: any, next: any) {
  checkDuplicateName(error, next);
});

const ProductCategory = model<IProductCategory>('ProductCategory', ProductCategorySchema);

export default ProductCategory;
