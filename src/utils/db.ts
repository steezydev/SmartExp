import { MongoClient, Db } from 'mongodb';

let client: any;
let db: any
export async function makeDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    await client.connect();
  }

  db = await client.db();
  return db;
}

export function getDb() {
  return db
}
