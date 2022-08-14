import { Document, model, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  userId: string;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: String, required: true, unique: true },
});

const RefreshToKen = model<IRefreshToken>('RefreshToken', RefreshTokenSchema);

export default RefreshToKen;
