import { ApiService } from './apiService'
import * as url from '../constants/endpoints'

export class UserService extends ApiService {

  /**
   * Get User `/bot/getUser`
   * 
   * @returns Response with user data
   */
  public async getUser(telegramId: number) {
    const response = await this.get(url.GET_USER + telegramId, {})

    if (response === undefined) {
      return {}
    }

    return response.data
  }
}