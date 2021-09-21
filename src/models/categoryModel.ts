import mongoose from 'mongoose';
const { Schema, model, Document } = mongoose;

interface ICategory extends Document {
  userTelegramId: number;
  title: string;
  emoji: string;
  type: string
}

const schema = new Schema<ICategory>({
  userTelegramId: Number,
  title: String,
  emoji: String,
  type: String,
});

export default model<ICategory>('categories', schema);