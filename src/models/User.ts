import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  user_id: string;
  email: string;
  name: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  user_id: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4() // Auto-generate UUID on creation
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Simple email validation
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const User = mongoose.model<IUser>('users', UserSchema);
export default User;