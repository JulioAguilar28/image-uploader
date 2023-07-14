import InputView from './InputView'
import ButtonView from './ButtonView'

function Login() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-y-4">
      <h2 className="text-xl text-[#4F4F4F]">Log In</h2>

      <form className="w-full h-full flex flex-col items-center gap-y-2">
        <InputView type="text" placeholder="julio@email.com" autoComplete="email" />
        <InputView
          type="password"
          autoComplete="current-password"
          placeholder="Introduce your password"
        />
        <ButtonView>Enter</ButtonView>
      </form>
    </div>
  )
}

export default Login
