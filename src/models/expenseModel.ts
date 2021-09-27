import mongoose from 'mongoose';
const { Schema, model, Document } = mongoose;

interface IExpense extends Document {
  telegramId: number;
  type: string;
  sum: number;
  currency: string;
  category: string;
  date: Date;
  description?: string;
}

const schema = new Schema<IExpense>({
  telegramId: Number,
  type: String,
  sum: Number,
  currency: String,
  category: String,
  date: Date,
  description: String,
});

export default model<IExpense>('expenses', schema);