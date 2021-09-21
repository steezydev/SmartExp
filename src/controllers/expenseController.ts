import { Telegraf, Scenes } from 'telegraf'
import { template } from "../utils/templater";
import { mainKeyboard } from '../constants/keyboards'

export default async (ctx: any) => {
  // Enter expense wizard
  await ctx.scene.enter('expense-wizard')
  return
}