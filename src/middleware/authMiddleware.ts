
import UserModel from '../models/userModel'
import { SessionContext } from '../context/context'

export default async (ctx: SessionContext, next: any) => {
  const user = await UserModel.findOne({ telegramId: ctx.from!.id }).exec()
  
  if (!user) {
    UserModel.create({
      name: ctx.from!.first_name,
      telegramId: ctx.from!.id,
      currency: 'RUB'
    }, function (err) {
      if (err) throw new Error();
    })
  }

  await next()
}