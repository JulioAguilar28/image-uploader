import LoginFormView from './LoginFormView'

function AuthController() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-y-4">
      <LoginFormView />
    </div>
  )
}

export default AuthController
