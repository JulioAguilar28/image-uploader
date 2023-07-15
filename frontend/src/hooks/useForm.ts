import { useState, useMemo, useRef } from 'react'

export default function useForm() {
  const [firstName, setFirstName] = useState<string>('')
  const isFirstNameDirty = useRef<boolean>(false)
  const [lastName, setLastName] = useState<string>('')
  const isLastNameDirty = useRef<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const isEmailDirty = useRef<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const isPasswordDirty = useRef<boolean>(false)

  const isValidFirstName = useMemo<boolean>(() => {
    const regex = /^[a-zA-Z ]*$/g
    return isFirstNameDirty.current ? regex.test(firstName) && firstName !== '' : true
  }, [firstName, isFirstNameDirty])

  const isValidLastName = useMemo<boolean>(() => {
    const regex = /^[a-zA-Z ]*$/g
    return isLastNameDirty.current ? regex.test(lastName) && lastName !== '' : true
  }, [lastName, isLastNameDirty])

  const isValidEmail = useMemo<boolean>(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return isEmailDirty.current ? emailRegex.test(email) && email !== '' : true
  }, [email, isEmailDirty])

  const isValidPassword = useMemo<boolean>(() => {
    const validation = password.length > 7 && password.length <= 32
    return isPasswordDirty.current ? validation && password !== '' : true
  }, [password])

  const isValidLoginData = useMemo<boolean>(() => {
    return isValidEmail && isValidPassword && email !== '' && password !== ''
  }, [isValidEmail, email, isValidPassword, password])

  const isValidSignupData = useMemo<boolean>(() => {
    return (
      isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidPassword &&
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      password !== ''
    )
  }, [
    isValidFirstName,
    firstName,
    isValidLastName,
    lastName,
    isValidEmail,
    email,
    isValidPassword,
    password
  ])

  const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
    isFirstNameDirty.current = true
  }
  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
    isLastNameDirty.current = true
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    isEmailDirty.current = true
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    isPasswordDirty.current = true
  }

  return {
    firstName,
    lastName,
    email,
    password,
    isValidFirstName,
    isValidLastName,
    isValidEmail,
    isValidPassword,
    isValidLoginData,
    isValidSignupData,
    handleChangeFirstName,
    handleChangeLastName,
    handleChangeEmail,
    handleChangePassword
  }
}
