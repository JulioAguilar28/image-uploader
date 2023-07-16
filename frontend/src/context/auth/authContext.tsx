import React, { createContext, useReducer } from 'react'
import { AuthState, initialAuthState, AuthReducer, AuthAction } from './authReducer'

export const AuthContext = createContext<AuthState>(initialAuthState)
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const AuthDispatchContext = createContext<React.Dispatch<AuthAction>>(() => {})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, dispatch] = useReducer(AuthReducer, initialAuthState)

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}
