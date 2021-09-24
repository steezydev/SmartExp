import { template } from "../utils/templater";
import { mainKeyboard } from '../constants/keyboards'
import { hisotryMenu } from '../menu'

export default async (ctx: any) => {
  hisotryMenu.replyToContext(ctx)
}