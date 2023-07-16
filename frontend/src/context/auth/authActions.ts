import { AuthMode, User } from '../../models/appModels'
import { AuthAction } from './authReducer'

/**
 * Public actions to dispatch actions
 * on a safety way, we recomment use this way
 * to dispatch actions
 */
export const setAuthMode = (mode: AuthMode): AuthAction => ({
  type: 'SetAuthMode',
  mode
})

export const setUser = (user: User): AuthAction => ({
  type: 'SetUser',
  user
})
