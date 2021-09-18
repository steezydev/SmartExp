import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  name: string;
  telegramId: number;
  currency?: string;
  expCategories?: [string];
  incCategories?: [string];
}

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  telegramId: { type: Number, required: true },
  currency: String,
  expCategories: Array,
  incCategories: Array
});

export default model<IUser>('users', schema);