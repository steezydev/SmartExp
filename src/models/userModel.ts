import * as mongoose from "mongodb";
import { getDb, makeDb } from "../utils/db";


class User {
  async getUser() {
    const db = getDb();
    const users = db.collection('users')
  }
}
