import { Telegraf, Scenes } from "telegraf"
import { SessionContext } from "./context/context"

import { Db } from "mongodb";
import { session } from "telegraf-session-mongodb"
import { expenseWizard } from './scenes/expenseScene'

// Controllers
import startupController from "./controllers/startupController"
import addController from "./controllers/addController"
import mainController from "./controllers/mainController"
import expenseController from "./controllers/expenseController"

// Keyboard
import keyboardButtons from './constants/keyboardButtons.json'

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!")
}

const bot = new Telegraf<SessionContext>(token)

export const setup = (db: Db) => {
  const stage = new Scenes.Stage([expenseWizard])

  bot.use(session(db))
  bot.use(stage.middleware())

  //On startup bot greets the users, adds him to the databse (if doesn't exist) and shows an inline keyboard
  bot.start(startupController)

  //Text commands
  bot.hears(keyboardButtons.back, mainController)
  bot.hears(keyboardButtons.mainMenu.add, addController)
  bot.hears(keyboardButtons.addMenu.expenses, expenseController)

  return bot;
};
