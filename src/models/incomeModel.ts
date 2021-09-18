import mongoose from 'mongoose';
const { Schema, model, Document } = mongoose;

interface IIncome extends Document {
  sum: number;
  category: string;
  date: string;
  description?: string;
}

const schema = new Schema({
  sum: Number,
  category: String,
  date: Date,
  description: String,
});

export default model<IIncome>('incomes', schema);