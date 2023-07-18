export interface UserCredentials {
  email: string
  password: string
}

export interface NewUserCredentials extends UserCredentials {
  firstName: string
  lastName: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  token: string
}

export interface Image {
  id: number
  name: string
  extension: string
}

export enum AuthMode {
  Login = 0,
  Signup = 1
}
