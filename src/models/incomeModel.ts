import mongoose from 'mongoose';
const { Schema, model, Document } = mongoose;

interface IIncome extends Document {
  telegramId: number;
  sum: number;
  currency: string;
  category: string;
  date: string;
  description?: string;
}

const schema = new Schema({
  telegramId: Number,
  sum: Number,
  currency: String,
  category: String,
  date: Date,
  description: String,
});

export default model<IIncome>('incomes', schema);