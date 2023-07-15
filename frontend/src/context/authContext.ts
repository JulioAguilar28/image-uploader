import { createContext } from 'react'
import { AuthMode, User } from '../models/appModels'

export interface IAuthContext {
  user?: User
  authMode: AuthMode
}

// export interface IAuthDispatchContext {

// }

export const initialAuthContext: IAuthContext = {
  user: undefined,
  authMode: AuthMode.Signup
}

export const AuthContext = createContext<IAuthContext>(initialAuthContext)
export const AuthDispatchContext = createContext(null)
