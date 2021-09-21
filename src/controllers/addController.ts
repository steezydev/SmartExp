import { template } from "../utils/templater";
import { addKeyboard } from '../constants/keyboards'

export default async (ctx: any) => {
  return ctx.reply(template('add', 'choice', {}),
    addKeyboard
      .resize()
  )
}