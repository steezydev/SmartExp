import * as dotenv from 'dotenv';
import { connectDB } from './utils/db'

dotenv.config();
process.setMaxListeners(0);

import { MongoClient } from 'mongodb';
import { setup } from './bot';

const initialize = async () => {
  await connectDB()

  const db = (await MongoClient.connect(process.env.MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true })).db();
  const bot = setup(db);

  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.botInfo?.username)


  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
};

initialize();