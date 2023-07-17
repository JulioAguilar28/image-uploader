import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import { useState, useEffect } from 'react'
import MainController from './components/MainController'
import * as AuthService from './services/AuthService'
import useAccessor from './hooks/useAccessor'
import * as AuthActions from './context/auth/authActions'
import './App.css'
import { AuthAction } from './context/auth/authReducer'

const verifyCurrentUser = async (dispatch: React.Dispatch<AuthAction>) => {
  const currentUser = await pipe(AuthService.getCurrentUser())()

  pipe(
    currentUser,
    O.fold(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      (user) => {
        dispatch(AuthActions.setUser(user))
      }
    )
  )
}

function App() {
  const [showMainContent, setShowMainContent] = useState<boolean>(false)
  const { authDispatch } = useAccessor()

  useEffect(() => {
    void verifyCurrentUser(authDispatch).then(() => {
      setShowMainContent(true)
    })
  }, [])

  return <>{showMainContent ? <MainController /> : <div>Loading...</div>}</>
}

export default App
