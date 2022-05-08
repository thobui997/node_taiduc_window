import bcryptjs from 'bcryptjs';
import { model, Schema } from 'mongoose';

interface IUser {
  username: string;
  password: string;
  confirmPassword?: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

const User = model<IUser>('User', UserSchema);

export default User;
