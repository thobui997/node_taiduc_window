import bcryptjs from 'bcryptjs';
import logger from '../config/logger';
import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  refreshToken: string;
  confirmPassword?: string;
  checkValidPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: '' },
});

UserSchema.pre('save', async function (next): Promise<void> {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashPassword;
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.checkValidPassword = async function (password: string) {
  try {
    return bcryptjs.compare(password, this.password);
  } catch (error) {
    logger.info(error);
  }
};

const User = model<IUser>('User', UserSchema);

export default User;
