import { Document, model, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  userId: string;
  token: string;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
});

const RefreshToKen = model<IRefreshToken>('RefreshToken', RefreshTokenSchema);

export default RefreshToKen;
