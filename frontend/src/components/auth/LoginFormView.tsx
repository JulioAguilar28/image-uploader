import React from 'react'
import InputView from '../views/InputView'
import ButtonView from '../views/ButtonView'
import useForm from '../../hooks/useForm'

export type UserCredentials = {
  email: string
  password: string
}

interface Props {
  onSubmit?: (credentials: UserCredentials) => void
}

function LoginFormView({ onSubmit }: Props) {
  const {
    email,
    password,
    isValidEmail,
    isValidPassword,
    isValidLoginData,
    handleChangeEmail,
    handleChangePassword
  } = useForm()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSubmit && isValidLoginData) onSubmit({ email, password })
  }

  return (
    <>
      <h2 className="text-xl text-[#4F4F4F]">Log In</h2>
      <form className="w-full h-full flex flex-col items-center gap-y-2" onSubmit={handleSubmit}>
        <InputView
          type="email"
          label="Email"
          placeholder="julio@email.com"
          autoComplete="email"
          value={email}
          error={!isValidEmail}
          errorLabel="Please introduce a valid email"
          onChange={handleChangeEmail}
        />
        <InputView
          type="password"
          label="Password"
          autoComplete="current-password"
          placeholder="Introduce your password"
          value={password}
          error={!isValidPassword}
          errorLabel="Please introduce a valid password"
          onChange={handleChangePassword}
        />
        <ButtonView disabled={!isValidLoginData}>Enter</ButtonView>
      </form>
    </>
  )
}

export default LoginFormView
