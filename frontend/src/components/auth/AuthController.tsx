import LoginFormView from './LoginFormView'
import SignupView from './SignupView'
import { AuthMode, NewUserCredentials, UserCredentials } from '../../models/appModels'
import useAccessor from '../../hooks/useAccessor'
import * as AuthActions from '../../context/auth/authActions'

function AuthController() {
  const { auth, authDispatch } = useAccessor()

  const handleSignup = (credentials: NewUserCredentials) => {
    console.log(credentials)
  }

  const handleLogin = (credentials: UserCredentials) => {
    console.log(credentials)
  }

  const handleChangeForm = (mode: AuthMode) => {
    authDispatch(AuthActions.setAuthMode(mode))
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-y-4">
      {auth.authMode === AuthMode.Login ? (
        <LoginFormView onSubmit={handleLogin} onChangeForm={handleChangeForm} />
      ) : (
        <SignupView onSubmit={handleSignup} onChangeForm={handleChangeForm} />
      )}
    </div>
  )
}

export default AuthController
