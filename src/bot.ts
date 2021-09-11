import { Telegraf, Scenes } from 'telegraf'
import { SessionContext } from './context/context'


import { Db } from 'mongodb'
import { session } from 'telegraf-session-mongodb'

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf<SessionContext>(token)

export const setup = (db: Db) => {
  bot.use(session(db))
  return bot
}

