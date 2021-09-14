import { Telegraf, Scenes } from "telegraf";
import { SessionContext } from "./context/context";

import { Db } from "mongodb";
import { session } from "telegraf-session-mongodb";

import { startup } from "./controllers/startupController";

const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf<SessionContext>(token);

export const setup = (db: Db) => {
  bot.use(session(db));

  //On startup bot greets the users, adds him to the databse (if doesn't exist) and shows an inline keyboard
  bot.start(startup);

  return bot;
};
