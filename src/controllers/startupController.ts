//On startup bot greets the users, adds him to the databse (if doesn't exist) and shows an inline keyboard
import { template } from "../utils/templater";
//import { UserModel } from "../models/userModel"

export const startup = async (ctx: any) => {

  //const userModel = new UserModel(ctx.from.id, ctx.from!.first_name)
  /*
  if (!(await userModel.checkUserExists())) {
    console.log(123)
    userModel.creatUser()
  }
  */

  return ctx.reply(template('startup', 'greeting', {}))
}