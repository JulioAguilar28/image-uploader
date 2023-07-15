import { useContext } from 'react'
import { AuthContext, IAuthContext } from '../context/authContext'

/**
 * Use this hook to retrieve information about
 * the global context.
 *
 * To use it correctly, import all the context to
 * provide just one hook with all of them.
 */
export interface AccessorInterface {
  auth: IAuthContext
}

export default function useAccessor() {
  const auth = useContext(AuthContext)

  return { auth }
}
