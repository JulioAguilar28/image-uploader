import { useContext } from 'react'
import { AuthContext, AuthDispatchContext } from '../context/auth/authContext'
import { AuthAction, AuthState } from '../context/auth/authReducer'

/**
 * Use this hook to retrieve information about
 * the global context.
 *
 * To use it correctly, import all the context to
 * provide just one hook with all of them.
 */
export interface AccessorInterface {
  auth: AuthState
  authDispatch: React.Dispatch<AuthAction>
}

export default function useAccessor(): AccessorInterface {
  const auth = useContext(AuthContext)
  const authDispatch = useContext(AuthDispatchContext)

  return { auth, authDispatch }
}
