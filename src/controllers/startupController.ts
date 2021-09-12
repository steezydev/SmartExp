//On startup bot greets the users, adds him to the databse (if doesn't exist) and shows an inline keyboard
import { template } from "../utils/templater";
import { UserModel } from "../models/userModel"

const userModel = new UserModel();
export const startup = (ctx: any) => {
  userModel.creatUser(ctx.from.id)

  return ctx.reply(template('startup', 'greeting', {}))
}