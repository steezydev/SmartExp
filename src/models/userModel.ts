import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  name: string;
  telegramId: number;
  currency: string;
}

const schema = new Schema<IUser>({
  name: String,
  telegramId: Number,
  currency: String,
});

export default model<IUser>('users', schema);