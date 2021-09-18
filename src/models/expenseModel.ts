import mongoose from 'mongoose';
const { Schema, model, Document } = mongoose;

interface IExpense extends Document {
  sum: number;
  category: string;
  date: string;
  description?: string;
}

const schema = new Schema<IExpense>({
  sum: Number,
  category: String,
  date: Date,
  description: String,
});

export default model<IExpense>('expenses', schema);