import axios, { Axios } from 'axios'

export class ApiService {
  private static instance: ApiService
  private _axios: Axios

  private constructor() {
    this._axios = axios.create({
      baseURL: 'http://localhost:3000/api/v1'
    })
  }

  public static of() {
    if (this.instance == null) this.instance = new ApiService()
    return this.instance._axios
  }
}

export const authenticateService = (token: string): string => {
  ApiService.of().defaults.headers.common.Authorization = `Bearer ${token}`
  return token
}
