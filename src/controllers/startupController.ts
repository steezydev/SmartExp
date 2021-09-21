//On startup bot greets the users, adds him to the databse (if doesn't exist) and shows an inline keyboard
import { template } from "../utils/templater";
import UserModel from "../models/userModel"
import { mainKeyboard } from '../constants/keyboards'

export default async (ctx: any) => {
  const user = await UserModel.findOne({ telegramId: ctx.from.id }).exec()

  if (!user) {
    UserModel.create({
      name: ctx.from!.first_name,
      telegramId: ctx.from.id,
      currency: 'RU'
    }, function (err) {
      if (err) throw new Error();
    })
  }

  return ctx.reply(template('startup', 'greeting', {}),
    mainKeyboard
      .resize()
  )
}