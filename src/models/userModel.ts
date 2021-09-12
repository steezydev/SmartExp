import { UserService } from '../services/userService'

const userService = new UserService()

export class UserModel {

  /** 
   * Checks for user in DB
   * 
   * @returns True or false
   * */
   async creatUser(telegramId: number) {
     console.log(telegramId)
    //const user = await userService.getUser(telegramId)

    //return user
  }
}