import { template } from "../utils/templater";
import { mainKeyboard } from '../constants/keyboards'
import { historyMenu } from '../menu'

export default async (ctx: any) => {
  historyMenu.replyToContext(ctx)
}