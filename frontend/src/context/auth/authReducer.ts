import { Reducer } from 'react'
import { AuthMode, User } from '../../models/appModels'

export interface AuthState {
  user?: User
  authMode: AuthMode
}

export const initialAuthState: AuthState = {
  user: undefined,
  authMode: AuthMode.Signup
}

/**
 * In order to type the action payload,
 * add a new object with the following shape
 *
 * type: name of the type
 * payload: property to modifiy the state
 */
type SetAuthModeAction = { type: 'SetAuthMode'; mode: AuthMode }
type SetUserAction = { type: 'SetUser'; user: User }

export type AuthAction = SetAuthModeAction | SetUserAction

export const AuthReducer: Reducer<AuthState, AuthAction> = (state, action): AuthState => {
  switch (action.type) {
    case 'SetAuthMode':
      return { ...state, authMode: action.mode }

    case 'SetUser':
      return { ...state, user: action.user }

    default:
      return { ...state }
  }
}
