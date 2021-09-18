import mongoose from 'mongoose'

export async function connectDB () {
  mongoose.connect(process.env.MONGODB_URI!).catch((e) => {
    throw new Error(e)
  });
}