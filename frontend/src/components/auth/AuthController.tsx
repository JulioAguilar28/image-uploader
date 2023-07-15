import LoginFormView, { UserCredentials } from './LoginFormView'
import SignupView, { NewUserCredentials } from './SignupView'

function AuthController() {
  const handleSignup = (credentials: NewUserCredentials) => {
    console.log(credentials)
  }

  const handleLogin = (credentials: UserCredentials) => {
    console.log(credentials)
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-y-4">
      {/* <LoginFormView /> */}
      <SignupView onSubmit={handleSignup} />
    </div>
  )
}

export default AuthController
