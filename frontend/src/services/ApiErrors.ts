import { AxiosResponse, AxiosError } from 'axios'

export class AuthError extends Error {
  public _tag: 'AuthError'

  constructor(message: string) {
    super(`$${message}`)
    this._tag = 'AuthError'
  }

  static of(message: string) {
    return new AuthError(message)
  }
}

export class ServerError extends Error {
  public _tag: 'ServerError'

  constructor(endpoint: string, message: string) {
    super(`${endpoint}: ${message}`)
    this._tag = 'ServerError'
  }

  public static of(endpoint: string, message: string) {
    return new ServerError(endpoint, message)
  }
}

export class UnexpectedError extends Error {
  public _tag: 'UnexpectedError'

  constructor(message: string) {
    super(`${message}`)
    this._tag = 'UnexpectedError'
  }

  public static of(message: string) {
    return new UnexpectedError(message)
  }
}

export class AxiosRequestError extends Error {
  public _tag: 'AxiosRequestError'
  public readonly message: string
  public readonly code: number
  public readonly response?: AxiosResponse
  public readonly request?: any

  public constructor(
    message: string,
    code: number,
    response?: AxiosResponse,
    request?: any
  ) {
    super()
    this._tag = 'AxiosRequestError'
    this.message = message
    this.code = code
    this.response = response
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.request = request
  }

  public static of(data: AxiosError<{ message: string }>) {
    const message = getErrorMessageFromApi(data)
    return new AxiosRequestError(message, data.status!, data.response, data.request)
  }

  public static unexpected(message: string) {
    return new AxiosRequestError(message, 0)
  }
}

export const parseRequestError = (reason: unknown) => {
  const axiosError = reason as AxiosError<{ message: string }>
  const anyError = reason as Error

  if (axiosError.response) return AxiosRequestError.of(axiosError)
  else return AxiosRequestError.unexpected(anyError.message)
}

const getErrorMessageFromApi = (
  error: AxiosError<{ message: string }>,
  defaultError = 'Unexpected error'
) => {
  return error.response?.data?.message ?? defaultError
}
