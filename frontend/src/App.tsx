import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import { useState, useEffect } from 'react'
import MainController from './components/MainController'
import * as AuthService from './services/AuthService'
import useAccessor from './hooks/useAccessor'
import * as AuthActions from './context/auth/authActions'
import { AuthAction } from './context/auth/authReducer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const verifyCurrentUser = async (dispatch: React.Dispatch<AuthAction>) => {
  const currentUser = await pipe(AuthService.getCurrentUser())()

  pipe(
    currentUser,
    O.fold(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => { },
      (user) => {
        dispatch(AuthActions.setUser(user))
        toast.success(`Welcome back ${user.firstName}`)
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

  return (
    <>
      {showMainContent && (
        <>
          <MainController />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </>
      )}
    </>
  )
}

export default App
