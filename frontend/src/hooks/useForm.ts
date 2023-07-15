import { useState, useMemo, useRef } from 'react'

export default function useForm() {
  const [email, setEmail] = useState<string>('')
  const isEmailDirty = useRef<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const isPasswordDirty = useRef<boolean>(false)

  const isValidEmail = useMemo<boolean>(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return isEmailDirty.current ? emailRegex.test(email) : true
  }, [email, isEmailDirty])

  const isValidPassword = useMemo<boolean>(() => {
    const validation = password.length > 7 && password.length <= 32
    return isPasswordDirty.current ? validation : true
  }, [password])

  const isValidUserData = useMemo<boolean>(() => {
    return isValidEmail && isValidPassword
  }, [isValidEmail, isValidPassword])

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    isEmailDirty.current = true
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    isPasswordDirty.current = true
  }

  return {
    email,
    password,
    isValidEmail,
    isValidPassword,
    isValidUserData,
    handleChangeEmail,
    handleChangePassword
  }
}
