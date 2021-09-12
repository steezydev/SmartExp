import axios from 'axios'

export class ApiService {
  private apiToken: string
  private baseUrl: string

  /**
   * Sets variable necessary for api requesting
   * 
   * @constructor
   */

  constructor() {
    this.apiToken = process.env.API_TOKEN!
    this.baseUrl = process.env.API_URI!
  }

  /**
   * Request with GET method
   * 
   * @param url {string} Request endpoint  
   * @param params {object} Query params
   * @returns API response
   */
  async get(url: string, params: any) {
    try {
      const response = await axios({
        method: 'get',
        url: this.baseUrl + url,
        params: params,
        headers: {
          token: this.apiToken
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })

      return response.data
    } catch (err: any) {
      if (err.response) {
        return {}
      }

      throw new Error(err)
    }
  }

  /**
   * Request with POST method
   * 
   * @param url {string} Request endpoint  
   * @param data {object} Request body
   * @returns API response
   */
  async post(url: string, data: any, params: any) {
    try {
      const response = await axios({
        method: 'post',
        url: this.baseUrl + url,
        data: data,
        params: params,
        headers: {
          token: this.apiToken
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })


      return response.data
    } catch (err: any) {
      if (err.response) {
        return {}
      }

      throw new Error(err)
    }
  }

  /**
   * Request with DELETE method
   * 
   * @param url {string} Request endpoint  
   * @param data {object} Request body
   * @returns API response
   */
  async delete(url: string, data: any, params: any) {
    try {
      const response = await axios({
        method: 'delete',
        url: this.baseUrl + url,
        data: data,
        params: params,
        headers: {
          token: this.apiToken
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })

      return response.data
    } catch (err: any) {
      if (err.response) {
        return {}
      }

      throw new Error(err)
    }
  }

  /**
   * Request with PUT method
   * 
   * @param url {string} Request endpoint  
   * @param data {object} Request body
   * @returns API response
   */
  async put(url: string, data: any, params: any) {
    try {
      const response = await axios({
        method: 'put',
        url: this.baseUrl + url,
        data: data,
        params: params,
        headers: {
          token: this.apiToken
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })


      return response.data
    } catch (err: any) {
      if (err.response) {
        return {}
      }

      throw new Error(err)
    }
  }
}