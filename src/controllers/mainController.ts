import { template } from "../utils/templater";
import { mainKeyboard } from '../constants/keyboards'

export default async (ctx: any) => {
  return ctx.reply(template('main', 'menu'),
    mainKeyboard
      .resize()
  )
}