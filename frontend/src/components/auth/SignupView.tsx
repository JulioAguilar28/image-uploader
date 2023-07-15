import React from 'react'
import ButtonView from '../views/ButtonView'
import InputView from '../views/InputView'
import useForm from '../../hooks/useForm'
import { AuthMode, NewUserCredentials } from '../../models/appModels'

interface Props {
  onSubmit?: (credentials: NewUserCredentials) => void
  onChangeForm?: (authMode: AuthMode) => void
}

function SignupView({ onSubmit, onChangeForm }: Props) {
  const {
    firstName,
    lastName,
    email,
    password,
    isValidFirstName,
    isValidLastName,
    isValidEmail,
    isValidPassword,
    isValidSignupData,
    handleChangeFirstName,
    handleChangeLastName,
    handleChangeEmail,
    handleChangePassword
  } = useForm()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSubmit) onSubmit({ firstName, lastName, email, password })
  }

  const handleChangeForm = () => {
    if (onChangeForm) onChangeForm(AuthMode.Login)
  }

  return (
    <>
      <h2 className="text-xl text-[#4F4F4F]">Sign Up</h2>

      <form className="w-full h-full flex flex-col items-center gap-y-2" onSubmit={handleSubmit}>
        <InputView
          type="text"
          label="First name"
          placeholder="Julio Cesar"
          autoComplete="firstName"
          value={firstName}
          error={!isValidFirstName}
          errorLabel="Please introduce a valid name"
          onChange={handleChangeFirstName}
        />
        <InputView
          type="text"
          label="Last name"
          placeholder="Aguilar"
          autoComplete="lastName"
          value={lastName}
          error={!isValidLastName}
          errorLabel="Please introduce a valid name"
          onChange={handleChangeLastName}
        />
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
        <div className="mt-4 w-full flex flex-col gap-y-1">
          <span className="text-sm text-gray-500">
            You already have an account.{' '}
            <span className="cursor-pointer hover:underline" onClick={handleChangeForm}>
              Log In
            </span>
          </span>
          <ButtonView disabled={!isValidSignupData}>Welcome</ButtonView>
        </div>
      </form>
    </>
  )
}

export default SignupView
