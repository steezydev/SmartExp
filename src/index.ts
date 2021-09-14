import * as dotenv from 'dotenv';

dotenv.config();
process.setMaxListeners(0);


import { MongoClient } from 'mongodb';
import { setup } from './bot';
import { makeDb } from './utils/db'

const initialize = async () => {
  //const db = (await MongoClient.connect(process.env.MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true })).db();
  const db = await makeDb()

  const bot = setup(db);

  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.botInfo?.username)


  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
};

initialize();